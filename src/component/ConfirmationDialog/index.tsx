import React from 'react';
import { Button, Dialog, Paper, Typography } from '@material-ui/core/';

export default function ConfirmationDialog({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: Function;
  onCancel: Function;
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Dialog open={open}>
      <Paper style={{ padding: '30px 50px' }}>
        <Typography variant='h5'>Are you sure ?</Typography>
        <div style={{ marginTop: 40, textAlign: 'right' }}>
          <Button onClick={handleCancel}>No</Button>
          <Button variant='contained' color='primary' onClick={handleConfirm}>
            Yes
          </Button>
        </div>
      </Paper>
    </Dialog>
  );
}
