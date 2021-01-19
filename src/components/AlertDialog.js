import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function AlertDialog(props) {
  const { open, setOpen, title, content, actions } = props;

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {actions === undefined ? (
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        ) : (
          actions.map((action, i) => (
            <Button
              onClick={() => {
                if (action.action !== undefined) action.action();
                handleClose();
              }}
              color="primary"
              autoFocus={i === actions.length - 1}
            >
              {action.text}
            </Button>
          ))
        )}
      </DialogActions>
    </Dialog>
  );
}
