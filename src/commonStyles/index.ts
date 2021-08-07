import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
export const useCommonStyles = makeStyles((theme: Theme) =>
  createStyles({
    fontWeightNormal: {
      fontWeight: 400,
    },
    fontWeightSemiBold: {
      fontWeight: 600,
    },
    fontWeightBold: {
      fontWeight: 800,
    },
    upperCase: {
      textTransform: 'uppercase',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
  }),
);
