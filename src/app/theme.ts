'use client'
// theme.js
import { createTheme } from '@mui/material/styles';
import { palette } from '@/theme/contants';

const theme = createTheme({
    palette:{
        primary:{
            main: palette?.oreoBlue
        }
    },
    typography:{
      fontFamily:'inherit',
        body1:{            
            color:palette.dark,
            fontSize:16,
            fontWeight:400
        },     
    },
    breakpoints: {
        values: {
          mobile: 0,
          tablet: 668,
          laptop: 770,
          desktop: 1025,
        },
      },    
});

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: false; // removes the `xs` breakpoint
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true; // adds the `mobile` breakpoint
      tablet: true;
      laptop: true;
      desktop: true;
    }
  }

export default theme;
