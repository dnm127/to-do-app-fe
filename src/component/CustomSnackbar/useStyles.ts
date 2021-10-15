import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 300,
      padding: 10,
      borderRadius: 5,
      textTransform: 'capitalize',
    },
    succesSnackBar: {
      backgroundColor: color.color14,
      color: color.color11,
    },
    infoSnackBar: {
      backgroundColor: color.color17,
      color: color.color11,
    },
    errorSnackBar: {
      backgroundColor: color.color16,
      color: color.color11,
    },
    snackBarIcon: {
      marginRight: 10,
    },
  }),
);
