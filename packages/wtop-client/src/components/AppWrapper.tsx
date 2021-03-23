import React, { useEffect } from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import {
  OnUserConnectDocument,
  useGetConnectedUsersQuery,
} from "../generated/graphql";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    title: {
      flexGrow: 1,
    },
    userCountContainer: {
      display: "flex",
    },
    userCount: {
      marginRight: theme.spacing(1),
    },
  })
);

interface AppWrapperProps {
  children: React.ReactNodeArray | React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps): React.ReactElement => {
  const classes = useStyles();

  const { data, subscribeToMore } = useGetConnectedUsersQuery();

  useEffect(() => {
    subscribeToMore({
      document: OnUserConnectDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, subscriptionData.data);
      },
    });
  }, [subscribeToMore]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            wtop
          </Typography>
          <Tooltip title={`${data?.users} users connected right now`}>
            <Typography className={classes.userCountContainer} component="div">
              <div className={classes.userCount}>{data?.users}</div>
              <GroupIcon />
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default AppWrapper;
