import { extendTheme } from '@chakra-ui/react';
import { mode, Styles, GlobalStyleProps } from '@chakra-ui/theme-tools'
 

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: "none"
    }
  })
};



const theme = extendTheme({
  styles
});

 



export default theme as typeof theme;