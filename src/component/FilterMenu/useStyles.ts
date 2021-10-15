import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { color } from '../../theme';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 5,
    },
    categoryFormControl: {
      marginLeft: 15,
      minWidth: 100,
    },
  }),
);
