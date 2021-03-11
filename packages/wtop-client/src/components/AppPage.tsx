import React from "react";
import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    content: {
      marginTop: theme.spacing(1),
    },
  })
);

interface AppPageProps {
  children: React.ReactChild;
}

const AppPage = ({ children }: AppPageProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            wtop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>{children}</Container>
    </div>
  );
};

export default AppPage;
