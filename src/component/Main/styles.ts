import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      position: 'relative',
    },
    mainHeader: {
      padding: theme.spacing(3, 4, 3, 4),
      // height: 80,
      position: 'sticky',
      top: 0,
      backgroundColor: color.color11,
      zIndex: 1,
    },

    mainTitle: {
      color: color.color10,
    },

    mainDate: {
      color: color.color12,
      marginTop: theme.spacing(1),
    },

    mainBody: {
      height: 'calc(100% - 140px)',
      padding: theme.spacing(4, 3, 2, 3),
      overflowY: 'scroll',
    },

    openNewTaskDialogBtn: {
      backgroundColor: `${color.color1} !important`,
      position: 'fixed',
      bottom: 15,
      right: 10,
      zIndex: 13001,

      '& svg': {
        fill: color.color11,
      },
    },

    rotateButton: {
      backgroundColor: `${color.color1} !important`,
      position: 'fixed',
      bottom: 15,
      right: 10,
      zIndex: 13001,

      '& svg': {
        fill: color.color11,
        transform: 'rotate(45deg)',
      },
    },

    switchBtn: {
      borderRadius: '50%',
      backgroundColor: color.color2,
      color: color.color11,
      fontSize: '10px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
      width: 25,
    },
  }),
);
