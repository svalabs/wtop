import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface DeleteFunc {
  (): Promise<void>;
}

export interface CloseFunc {
  (): void;
}

export type DeleteDialogProps = {
  title: string;
  onDelete: DeleteFunc;
  handleClose: CloseFunc;
} & DialogProps;

const DeleteDialog = ({
  title,
  onDelete,
  handleClose,
  ...props
}: DeleteDialogProps): React.ReactElement => {
  return (
    <Dialog {...props} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        This can <b>not</b> be undone!
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button
          onClick={async () => {
            handleClose();
            await onDelete();
          }}
          color="primary"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
