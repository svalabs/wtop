import {
  useDeleteLessonMutation,
  useGetLessonsQuery,
} from "../generated/graphql";
import React, { useState } from "react";
import DataList, { IDataListEntry } from "./DataList";
import { useRouteMatch } from "react-router-dom";
import LinkRouter from "./LinkRouter";
import PeopleIcon from "@material-ui/icons/People";
import {
  Breadcrumbs,
  createStyles,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AppPage from "./AppPage";
import HomeIcon from "@material-ui/icons/Home";
import DeleteDialog from "./DeleteDialog";

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
      cursor: "pointer",
    },
  })
);

const LessonList = (): React.ReactElement => {
  const match = useRouteMatch<{
    course: string;
  }>();
  const classes = useStyles();
  const { data, refetch } = useGetLessonsQuery({
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
          id: lesson,
        };
      }
    ) || [];

  const [deleteLesson] = useDeleteLessonMutation();

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  const handleClickOpen = (id: string) => {
    setCurrent(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent(null);
  };

  return (
    <AppPage>
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter color="inherit" to={"/"} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Courses
          </LinkRouter>
          <Link
            color="inherit"
            onClick={async () => {
              await refetch();
            }}
            className={classes.link}
          >
            <PeopleIcon className={classes.icon} />
            {match.params.course}
          </Link>
        </Breadcrumbs>

        <DataList
          title={`Available lessons in the course ${match.params.course}`}
          data={list}
          onDelete={async (id) => {
            handleClickOpen(id);
          }}
        />
        <DeleteDialog
          title={`Delete the lesson ${current}?`}
          onDelete={async () => {
            await deleteLesson({
              variables: {
                lesson: current as string,
                course: match.params.course,
              },
            });
            await refetch();
          }}
          open={open}
          keepMounted
          handleClose={handleClose}
          onClose={handleClose}
        />
      </>
    </AppPage>
  );
};

export default LessonList;
