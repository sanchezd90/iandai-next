'use client'
// theme.js
import { createTheme } from '@mui/material/styles';
import { palette } from '@/theme/contants';

const theme = createTheme({
    palette:{
        primary:{
            main: palette?.dark
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
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              color: 'black',
              backgroundColor: 'transparent',
              outline:'2px solid black',              
              fontWeight:700,              
              borderRadius: 10,
              padding:'8px 24px' 
            },
          },
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
