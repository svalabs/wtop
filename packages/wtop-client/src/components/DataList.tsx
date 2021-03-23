import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2, 0, 0, 2),
    },
    offset: theme.mixins.toolbar,
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    link: {
      display: "flex",
      alignItems: "center",
    },
    lists: {
      marginTop: theme.spacing(1),
    },
  })
);

export interface DeleteFunc {
  (id: string): Promise<void>;
}

export interface IDataListEntry {
  label: string;
  icon?: React.ReactElement;
  link: string;
  id: string;
}

export interface DataListProps {
  title: string;
  data: Array<IDataListEntry>;
  onDelete?: DeleteFunc;
}

const DataList = ({
  title,
  data,
  onDelete,
}: DataListProps): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Paper className={classes.lists}>
        <Typography variant={"h6"} className={classes.title}>
          {title}
        </Typography>
        <List component="nav">
          {data.map(({ label, icon, link, id }, i) => {
            return (
              <ListItem
                button
                key={`data-entry-${i}`}
                onClick={async () => {
                  history.push(link);
                }}
              >
                <ListItemIcon>{icon || <FolderIcon />}</ListItemIcon>
                <ListItemText primary={label} />
                {onDelete && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={async () => {
                        await onDelete(id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default DataList;
