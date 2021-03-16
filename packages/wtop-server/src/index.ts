import 'reflect-metadata';
import express from 'express';
import * as ws from 'ws';
import { createConnection } from 'typeorm';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { Container } from 'typedi';
import {
  IsDefined, IsInt, IsString, IsUUID, Max, Min, validate,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as path from 'path';

import * as http from 'http';
import ProgressResolver from './resolvers/ProgressResolver';
import ProgressEntry from './models/ProgressEntry';
import {
  DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER,
} from './database';
import ProgressEntryView from './models/ProgressEntryView';

const PACKAGE_NAME = process.env.npm_package_name || 'wtop';
const VERSION = process.env.npm_package_version || '1.0.0';
const HTTP_PORT = process.env.WTOP_PORT || '3030';
const GRAPHQL_PATH = process.env.WTOP_GRAPHQL_PATH || '/graphql';

class ClientUpdate {
  @IsInt()
  @Min(0)
  @Max(100)
  progress!: number;

  @IsString()
  @IsDefined()
  userName!: string;

  @IsString()
  @IsDefined()
  @IsUUID(4)
  userId!: string;

  @IsString()
  @IsDefined()
  lesson!: string;

  @IsString()
  @IsDefined()
  course!: string;
}

async function main() {
  Container.set('pubsub', new PubSub() as PubSubEngine);
  const app = express();

  await createConnection({
    type: 'postgres',
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT, 10),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [
      ProgressEntry,
      ProgressEntryView,
    ],
    synchronize: true,
  });

  // Set up a headless websocket server that prints any
  // events that come in.
  const wsServer = new ws.Server({ noServer: true, path: '/progress' });

  const schema = await buildSchema({
    resolvers: [
      ProgressResolver,
    ],
    dateScalarMode: 'timestamp',
    emitSchemaFile: path.resolve('./schema.gql'),
    pubSub: Container.get<PubSubEngine>('pubsub'),

  });

  const gqlServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
    }),

  });

  gqlServer.applyMiddleware({ app, path: GRAPHQL_PATH });

  wsServer.on('connection', (socket, request) => {
    console.log(request.headers, request.url);
    socket.on('message', (message) => {
      try {
        const msg = plainToClass(
          ClientUpdate,
          JSON.parse(message.toString()),
        );

        validate(msg).then((errors) => {
          if (errors.length === 0) {
            const update = ProgressEntry.create();

            update.user = msg.userId;
            update.userName = msg.userName;
            update.lesson = msg.lesson;
            update.course = msg.course;
            update.progress = msg.progress;

            update.save().then(async () => {
              console.log(update);
              const viewEntry = await ProgressEntryView.findOne({
                where: {
                  user: update.user,
                  lesson: update.lesson,
                  course: update.course,
                },
              });

              await Container.get<PubSubEngine>('pubsub').publish(`${update.course}/${update.lesson}`, viewEntry);
            });
          }
        });
      } catch (e) {
        // Malformed JSON?
      }
    });
  });
  const httpServer = http.createServer(app);
  gqlServer.installSubscriptionHandlers(httpServer);

  // Remove apollos listener so we can hijack this for our own data.
  const [apolloListener] = httpServer.listeners('upgrade');
  httpServer.removeAllListeners('upgrade');

  httpServer.on('upgrade', (request, socket, head) => {
    const pathname = request.url;

    console.log(request.url);
    if (pathname === '/progress') {
      wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit('connection', socket, request);
      });
    } else if (pathname === '/graphql') {
      apolloListener(request, socket, head);
    } else {
      socket.destroy();
    }
  });

  // `server` is a vanilla Node.js HTTP server, so use
  // the same ws upgrade process described here:
  // https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
  const server = httpServer.listen({
    port: parseInt(HTTP_PORT, 10),
  }, () => {
    console.info(`\u{1F680} Starting ${PACKAGE_NAME} v${VERSION}`);
  });

  const gracefulShutdown = () => {
    console.info('Graceful shutdown initiated...');
    server.close(() => {
      console.log('Done. So Long, and Thanks for All the Fish!');
      process.exit(0);
    });
  };

  // Handle an exit gracefully terminating all remaining connections.
  ['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, gracefulShutdown));
}

main();
