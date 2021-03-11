FROM node:15-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx tsc
FROM node:15-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
RUN npm install --only=prod
CMD ["node", "build/index.js"]