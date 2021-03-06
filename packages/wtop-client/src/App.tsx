import "fontsource-roboto";
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import CourseList from "./components/CourseList";
import LessonList from "./components/LessonList";
import LessonOverview from "./components/LessonOverview";
import UserOverview from "./components/UserOverview";
import AppWrapper from "./components/AppWrapper";

export const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3030/graphql"
      : `https://${process.env.REACT_APP_WTOP_HOSTNAME}/graphql`,
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:3030/graphql"
      : `wss://${process.env.REACT_APP_WTOP_HOSTNAME}/graphql`,
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = (): React.ReactElement => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <AppWrapper>
        <Router>
          <Switch>
            <Route path="/course/:course/:lesson/:uuid">
              <UserOverview />
            </Route>
            <Route path="/course/:course/:lesson">
              <LessonOverview />
            </Route>
            <Route path="/course/:course">
              <LessonList />
            </Route>
            <Route path="/">
              <CourseList />
            </Route>
          </Switch>
        </Router>
      </AppWrapper>
    </ApolloProvider>
  );
};

export default App;
