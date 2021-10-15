import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      borderRadius: '12px',
    },

    formContainer: {
      height: 660,
      backgroundColor: color.color11,
      padding: theme.spacing(4, 3),
      position: 'relative',
    },

    formInput: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },

    priorityContainer: {
      marginTop: 7,
    },

    radioGroupLabel: {
      fontSize: 13,
    },

    radioButton: {
      color: `${color.color2} !important`,
    },

    categorySelector: {
      width: '100%',
      marginBottom: theme.spacing(2),

      '& input': {
        width: '100%',
      },
    },

    openNewCategoryForm: {
      backgroundColor: color.color3,
      marginTop: 30,
    },

    submitBtn: {
      position: 'absolute',
      right: 80,
      bottom: 15,
      backgroundColor: color.color4,
      color: color.color11,

      '&:hover': {
        backgroundColor: color.color4,
      },
    },
  }),
);
