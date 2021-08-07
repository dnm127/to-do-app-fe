import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    priorityContainer: {
      borderRadius: '7px',
      width: 20,
      textAlign: 'center',
      marginRight: theme.spacing(2),
    },
    highPriority: {
      backgroundColor: color.color16,
      color: color.color11,
    },
    mediumPriority: {
      backgroundColor: color.color15,
      color: color.color11,
    },
    lowPriority: {
      backgroundColor: color.color14,
      color: color.color11,
    },
  }),
);
