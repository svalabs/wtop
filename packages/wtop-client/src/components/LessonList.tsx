import { useGetLessonsQuery } from "../generated/graphql";
import React from "react";
import DataList, { IDataListEntry } from "./DataList";
import { useRouteMatch } from "react-router-dom";
import LinkRouter from "./LinkRouter";
import PeopleIcon from "@material-ui/icons/People";
import {
  Breadcrumbs,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AppPage from "./AppPage";
import HomeIcon from "@material-ui/icons/Home";

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
  })
);

const LessonList = (): React.ReactElement => {
  const match = useRouteMatch<{
    course: string;
  }>();
  const classes = useStyles();
  const { data } = useGetLessonsQuery({
    variables: {
      course: match.params.course,
    },
    fetchPolicy: "network-only",
  });

  const list =
    data?.lessons.map(
      (lesson): IDataListEntry => {
        return {
          label: lesson,
          link: `/course/${match.params.course}/${lesson}`,
        };
      }
    ) || [];

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
        </Breadcrumbs>

        <DataList
          title={`Available lessons in the course ${match.params.course}`}
          data={list}
        />
      </>
    </AppPage>
  );
};

export default LessonList;
