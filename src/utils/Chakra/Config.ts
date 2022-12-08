import { extendTheme } from "@chakra-ui/react";
import { GlobalStyleProps, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    
    "#__next": {
      bg: "url(/829s-min.png)",
      bgSize: "10% auto",
      display: "flex",
      flexDir: "column",
      height: "100vh"
    },
  }),
};

const theme = extendTheme({
  styles,
});

export default theme as typeof theme;
