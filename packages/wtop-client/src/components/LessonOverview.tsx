import React from "react";
import AppPage from "./AppPage";
import { useRouteMatch } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CircularProgress,
  CircularProgressProps,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import LinkRouter from "./LinkRouter";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import LinkIcon from "@material-ui/icons/Link";
import DoneIcon from "@material-ui/icons/Done";
import {
  OnProgressUpdateDocument,
  ProgressEntryView,
  Subscription,
  useGetProgressQuery,
} from "../generated/graphql";

type ProgressUpdate = { __typename?: "ProgressEntryView" } & Pick<
  ProgressEntryView,
  "user" | "progress" | "userName" | "isFinished"
>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    link: {
      display: "flex",
      alignItems: "center",
    },
    cardContainer: {
      display: "flex",
      height: "100%",
      flexWrap: "wrap",
      margin: theme.spacing(5),
    },
    card: {
      margin: theme.spacing(2),
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    cardContent: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      height: "100%",
    },
    userName: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    },
    cardHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    doneIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
): React.ReactElement => (
  <Box position="relative" display="inline-flex">
    <CircularProgress variant="determinate" {...props} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="h5"
        component="div"
        color="textSecondary"
      >{`${Math.round(props.value)}`}</Typography>
    </Box>
  </Box>
);

const LessonOverview = (): React.ReactElement => {
  const classes = useStyles();

  const match = useRouteMatch<{
    course: string;
    lesson: string;
  }>();

  const { data, subscribeToMore } = useGetProgressQuery({
    variables: {
      course: match.params.course,
      lesson: match.params.lesson,
    },
    fetchPolicy: "network-only",
  });

  subscribeToMore({
    document: OnProgressUpdateDocument,
    variables: {
      course: match.params.course,
      lesson: match.params.lesson,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const update: ProgressUpdate = ((subscriptionData.data as unknown) as Subscription)
        .courseSubscription;

      const oldData = prev.progress.findIndex((e) => e.user === update.user);
      if (oldData !== -1) {
        return Object.assign({}, prev, {
          progress: [
            ...prev.progress.slice(0, oldData),
            update,
            ...prev.progress.slice(oldData + 1),
          ],
        });
      } else {
        return Object.assign({}, prev, {
          progress: [...prev.progress, update],
        });
      }
    },
  });

  return (
    <AppPage>
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter color="inherit" to={"/"} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Courses
          </LinkRouter>
          <LinkRouter
            color="inherit"
            to={`/course/${match.params.course}`}
            className={classes.link}
          >
            <PeopleIcon className={classes.icon} />
            {match.params.course}
          </LinkRouter>
          <LinkRouter
            color="inherit"
            to={`/course/${match.params.course}/${match.params.lesson}`}
            className={classes.link}
          >
            <LinkIcon className={classes.icon} />
            {match.params.lesson}
          </LinkRouter>
        </Breadcrumbs>
        <div className={classes.cardContainer}>
          {data?.progress.map((entry: ProgressUpdate) => {
            return (
              <Card key={entry.user} className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardHeader}>
                    {entry.isFinished && (
                      <DoneIcon className={classes.doneIcon} />
                    )}
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.userName}
                      title={entry.userName}
                    >
                      <LinkRouter
                        color={"inherit"}
                        to={`/course/${match.params.course}/${match.params.lesson}/${entry.user}`}
                      >
                        {entry.userName}
                      </LinkRouter>
                    </Typography>
                  </div>

                  <Box margin={"auto"}>
                    <CircularProgressWithLabel
                      size={100}
                      value={entry.progress}
                    />
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </>
    </AppPage>
  );
};

export default LessonOverview;
