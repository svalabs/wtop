import { useGetCoursesQuery } from "../generated/graphql";
import React from "react";
import DataList, { IDataListEntry } from "./DataList";
import AppPage from "./AppPage";
import {
  Breadcrumbs,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import LinkRouter from "./LinkRouter";
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

const CourseList = (): React.ReactElement => {
  const { data } = useGetCoursesQuery({
    fetchPolicy: "network-only",
  });
  const classes = useStyles();
  const list =
    data?.courses.map(
      (course): IDataListEntry => {
        return {
          label: course,
          link: `/course/${course}`,
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
        </Breadcrumbs>
        <DataList title={"Available courses"} data={list} />
      </>
    </AppPage>
  );
};

export default CourseList;
