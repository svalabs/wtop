import AppPage from "./AppPage";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import LinkRouter from "./LinkRouter";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import LinkIcon from "@material-ui/icons/Link";
import PersonIcon from "@material-ui/icons/Person";
import { useGetUserDataQuery } from "../generated/graphql";
import DataList, { IDataListEntry } from "./DataList";
import { ResponsiveLineCanvas, Serie } from "@nivo/line";
import moment from "moment";

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
    graph: {
      height: theme.spacing(75),
    },
  })
);

const UserOverview = (): React.ReactElement => {
  const classes = useStyles();
  const {
    params: { course, lesson, uuid },
  } = useRouteMatch<{
    course: string;
    lesson: string;
    uuid: string;
  }>();
  const { data, error } = useGetUserDataQuery({
    variables: {
      course,
      lesson,
      uuid,
    },
    fetchPolicy: "no-cache",
  });

  if (!data || error) {
    return <div />;
  }
  const listData: IDataListEntry[] = data.otherLessons
    .filter((l) => l.lesson !== lesson || l.course !== course)
    .map((e) => {
      return {
        link: `/course/${e.course}/${e.lesson}/${uuid}`,
        label: `${e.course} / ${e.lesson}`,
      };
    });
  const graphData: Serie[] = [
    {
      id: "a",
      data: data.progress.map((e) => {
        return {
          x: moment.unix(e.createdAt / 1000).format("YYYY-MM-DD HH:mm:ss"),
          y: e.progress,
        };
      }),
    },
  ];
  console.log(graphData);

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
            to={`/course/${course}`}
            className={classes.link}
          >
            <PeopleIcon className={classes.icon} />
            {course}
          </LinkRouter>
          <LinkRouter
            color="inherit"
            to={`/course/${course}/${lesson}`}
            className={classes.link}
          >
            <LinkIcon className={classes.icon} />
            {lesson}
          </LinkRouter>
          <LinkRouter
            color="inherit"
            to={`/course/${course}/${lesson}`}
            className={classes.link}
          >
            <PersonIcon className={classes.icon} />
            {data.userName}
          </LinkRouter>
        </Breadcrumbs>
        <Box m={2} />
        <Paper className={classes.graph}>
          <ResponsiveLineCanvas
            data={graphData}
            margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
            yScale={{
              type: "linear",
              min: 0,
              max: 100,
            }}
            xScale={{
              type: "time",
              useUTC: false,
              format: "%Y-%m-%d %H:%M:%S",
            }}
            axisLeft={{
              legend: "progress",
              legendOffset: -50,
            }}
            xFormat="time:%Hh %Mm"
            axisBottom={{
              tickValues: 5,
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              format: (data) => {
                console.log(data);
                return moment(data).format("HH:mm:ss");
              },
            }}
            pointSize={10}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
          />
        </Paper>
        <DataList title={"Other courses this user is in"} data={listData} />
      </>
    </AppPage>
  );
};

export default UserOverview;
