import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoContainer: {
      borderRadius: '7px',
      minWidth: '50px',
      padding: '1px 5px',
      textAlign: 'center',
      backgroundColor: color.color3,
    },
    doneContainer: {
      borderRadius: '7px',
      minWidth: '50px',
      padding: '1px 5px',
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
