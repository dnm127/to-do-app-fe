import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskBadge: {
      borderRadius: 12,
      boxShadow: `0 0 5px 5px ${color.color13}`,
      padding: theme.spacing(4, 3, 4, 3),
      marginBottom: theme.spacing(5),
      height: 70,
    },
    taskTitleContainer: {
      width: '95%',
      overflow: 'hidden',
      marginLeft: theme.spacing(3),
    },
    taskTitle: {
      color: color.color10,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    taskCreatedDate: {
      color: color.color12,
      marginRight: theme.spacing(3),
    },
  }),
);
