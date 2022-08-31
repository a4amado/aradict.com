import "../scripts/wdyr";
import '../styles/globals.css';

import i18next from 'i18next';
import { appWithTranslation, i18n } from 'next-i18next';
import Router from 'next/router';
import React, { Suspense } from 'react';

import { ChakraProvider, Portal, PortalManager, ToastProvider } from '@chakra-ui/react';

import Loading from '../components/Loading';
import AxiosProvider from '../utils/AxiosConfig';
import theme from '../utils/Chakra/Config';
import PagePropsProvider from '../utils/PagePropsInComponents';

i18next.init();

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n!.dir(lng));
  
});


import type { AppProps } from "next/app";
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

