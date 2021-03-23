import React from "react";
import AppPage from "./AppPage";
import { useRouteMatch } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import LinkRouter from "./LinkRouter";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import LinkIcon from "@material-ui/icons/Link";
import AdjustIcon from "@material-ui/icons/Adjust";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import {
  OnProgressUpdateDocument,
  ProgressEntryView,
  Subscription,
  useGetProgressQuery,
} from "../generated/graphql";

type ProgressUpdate = { __typename?: "ProgressEntryView" } & Pick<
  ProgressEntryView,
  "user" | "progress" | "userName" | "isFinished" | "maxProgress"
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
    waveShape: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      borderRadius: "50%",
      overflow: "hidden",
      position: "relative",
      "&:after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        boxShadow: "inset 0px 0px 30px 0px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        zIndex: 3,
      },
    },

    "@keyframes animate": {
      "0%": {
        transform: "translate(-50%, -75%) rotate(0deg)",
      },

      "100%": {
        transform: "translate(-50%, -75%) rotate(360deg)",
      },
    },
    waveLabel: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      left: 0,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.getContrastText("#4973ff"),
    },
    wave: {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "200%",
      height: "200%",
      transform: "translate(-25%, 0)",
      background: "#4973ff",
      "&:after, &:before": {
        content: "''",
        position: "absolute",
        width: "110%",
        height: "100%",
        top: 0,
        left: "50%",
        transform: "translate(-50%, -75%)",
        background: "#000",
      },
      "&:before": {
        borderRadius: "45%",
        background: "rgba(179, 241, 255, 1)",
        animation: "$animate 10s linear infinite",
      },
      "&:after": {
        borderRadius: "40%",
        background: "rgba(179, 241, 255, 0.5)",
        animation: "$animate 10s linear infinite",
      },
    },
  })
);

type ProgressProps = {
  value: number;
  maxValue: number;
};

const FancyProgress = ({
  value,
  maxValue,
}: ProgressProps): React.ReactElement => {
  const classes = useStyles();

  const fill = maxValue * 1.125 * -1 + 50;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div className={classes.waveShape}>
        <div
          className={classes.wave}
          style={{
            top: `${fill}%`,
          }}
        />
      </div>
      <div className={classes.waveLabel}>{value}%</div>
    </div>
  );
};

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
                    {entry.isFinished ? (
                      <Tooltip title={"User has scrolled past 95%"}>
                        <AdjustIcon className={classes.doneIcon} />
                      </Tooltip>
                    ) : (
                      <Tooltip title={"User has not scrolled past 95% yet"}>
                        <RadioButtonUncheckedIcon
                          className={classes.doneIcon}
                        />
                      </Tooltip>
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
                    <FancyProgress
                      value={entry.progress}
                      maxValue={entry.maxProgress}
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
