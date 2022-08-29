import { AspectRatio } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import { mode, Styles, GlobalStyleProps, JSXElementStyles } from '@chakra-ui/theme-tools'
 

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    html: {
      
      height: "100%"
    },
    body: {
      bg: "transparent",
      height: "100%"
      
    },
    "#__next": {
      bg: "url(/829s-min.png)",
      bgSize: "10% auto",
        display: "flex",
        flexDir: "column",
        alignItems: "stretch",
        height: "100%"
    }, 

  })
};



const theme = extendTheme({
  styles
});




export default theme as typeof theme;