import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onDismiss,
  title = null,
  content = 'Are you sure?',
  confirmBtnText = 'Yes',
  dismissBtnText = 'No',
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="primary">
            {content &&
              content.split('\n').map((chunk, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {chunk}
                </p>
              ))}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onDismiss} color="default" variant="outlined">
          {dismissBtnText}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
