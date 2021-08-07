import { createTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

export const color = {
  // color1: '#0D1821',
  // color2: '#344966',
  // color3: '#B4CDED',
  // color4: '#F0F4EF',
  // color5: '#BFCC94',
  // color6: '#fff',
  // color7: 'grey',
  color1: '#03045E',
  color2: '#023E8A',
  color3: '#0077B6',
  color4: '#0096C7',
  color5: '#00B4D8',
  color6: '#48CAE4',
  color7: '#90E0EF',
  color8: '#ADE8F4',
  color9: '#CAF0F8',
  color10: '#0D1821',
  color11: '#fff',
  color12: '#ADB5BD',
  color13: '#DEE2E6',
  color14: green[500],
  color15: yellow[500],
  color16: red[500],
  color17: '#03a9f4',
};

// fontFamily: 'Open Sans, sans-serif',
export const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
  spacing: 5,
});
