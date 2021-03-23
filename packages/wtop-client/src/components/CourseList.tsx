import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../generated/graphql";
import React, { useState } from "react";
import DataList, { IDataListEntry } from "./DataList";
import AppPage from "./AppPage";
import {
  Breadcrumbs,
  createStyles,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
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

const CourseList = (): React.ReactElement => {
  const { data, refetch } = useGetCoursesQuery({
    fetchPolicy: "network-only",
  });
  const classes = useStyles();
  const list =
    data?.courses.map(
      (course): IDataListEntry => {
        return {
          label: course,
          link: `/course/${course}`,
          id: course,
        };
      }
    ) || [];

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

  const [deleteCourse] = useDeleteCourseMutation();

  return (
    <AppPage>
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            onClick={async () => {
              await refetch();
            }}
            color="inherit"
            className={classes.link}
          >
            <HomeIcon className={classes.icon} />
            Courses
          </Link>
        </Breadcrumbs>
        <DataList
          title={"Available courses"}
          data={list}
          onDelete={async (id) => {
            handleClickOpen(id);
          }}
        />
        <DeleteDialog
          title={`Delete the course ${current}?`}
          onDelete={async () => {
            await deleteCourse({
              variables: {
                course: current as string,
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

export default CourseList;
