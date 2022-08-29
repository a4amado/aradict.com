import "../styles/globals.css";




import { appWithTranslation, i18n } from "next-i18next";
import i18next from "i18next";
i18next.init();

import React, { Suspense } from "react";

import AxiosProvider from "../utils/AxiosConfig";
import { ChakraProvider, Portal, PortalManager } from "@chakra-ui/react";

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n!.dir(lng));
  
});


import type { AppProps } from "next/app";
import Loading from "../components/Loading";
import PagePropsProvider from "../utils/PagePropsInComponents";
import theme from "../utils/Chakra/Config";







import { ToastProvider,  } from "@chakra-ui/react";


import Router from "next/router";


const gg = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}



function MyApp({ Component, pageProps }: AppProps) {

  return (
    
    <PagePropsProvider value={pageProps}>
      <AxiosProvider>
        <ChakraProvider theme={theme}>
          <PortalManager>
            <Loading />

            <Component {...pageProps} />
            <ToastProvider motionVariants={gg}/>
            
          </PortalManager>
        </ChakraProvider>
      </AxiosProvider>
    </PagePropsProvider>
  );
}



export default appWithTranslation(MyApp);

