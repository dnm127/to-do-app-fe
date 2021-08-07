import React from 'react';
import { Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import { handleSnackbar } from '../../redux/actions';
import { SNACKBAR_STATUS } from '../../constant/snackbar';
import { useStyles } from './useStyles';
import classNames from 'classnames';

export default function CustomSnackBar({
  open,
  status,
  content,
}: {
  open: boolean;
  status: string;
  content: string;
}) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const getSnackbarChild = () => {
    switch (status) {
      case SNACKBAR_STATUS.INFO:
        return (
          <div className={classNames(styles.container, styles.infoSnackBar)}>
            <InfoIcon className={styles.snackBarIcon} /> {content}
          </div>
        );
      case SNACKBAR_STATUS.SUCCESS:
        return (
          <div className={classNames(styles.container, styles.succesSnackBar)}>
            <CheckCircleIcon className={styles.snackBarIcon} /> {content}
          </div>
        );
      case SNACKBAR_STATUS.ERROR:
        return (
          <div className={classNames(styles.container, styles.errorSnackBar)}>
            <ErrorIcon className={styles.snackBarIcon} /> {content}
          </div>
        );
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={() => dispatch(handleSnackbar({ open: false }))}
      autoHideDuration={5000}
    >
      <div>{getSnackbarChild()}</div>
    </Snackbar>
  );
}
