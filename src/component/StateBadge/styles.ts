import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoContainer: {
      borderRadius: '7px',
      width: 50,
      textAlign: 'center',
      backgroundColor: color.color3,
    },
    doneContainer: {
      borderRadius: '7px',
      width: 50,
      textAlign: 'center',
      backgroundColor: color.color5,
    },
    todoState: {
      color: color.color11,
    },
    doneState: {
      color: color.color11,
    },
  }),
);
