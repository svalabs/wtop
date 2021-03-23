import React from "react";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    content: {
      marginTop: theme.spacing(1),
      height: "100%",
    },
  })
);

interface AppPageProps {
  children: React.ReactChild;
}

const AppPage = ({ children }: AppPageProps): React.ReactElement => {
  const classes = useStyles();

  return <Container className={classes.content}>{children}</Container>;
};

export default AppPage;
