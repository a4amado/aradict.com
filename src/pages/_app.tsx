
import i18next from 'i18next';
import { appWithTranslation, i18n } from 'next-i18next';
import React, { Suspense } from 'react';

import { useEffect } from 'react';

const confirmPageRefresh = e => {
  e.preventDefault();
  const shouldReload = confirm("Confirm full refresh?");
  e.returnValue = shouldReload;
  return shouldReload;
}

export const usePreventFastRefreshDev = () => {
  useEffect(() => {

    if(process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      window.addEventListener('beforeunload', confirmPageRefresh);
      return () => window.removeEventListener('beforeunload', confirmPageRefresh);
    }
  }, [])
}

import { ChakraProvider, Portal, PortalManager, ToastProvider } from '@chakra-ui/react';

import Loading from '../components/Loading';
import AxiosProvider from '../utils/AxiosConfig';
import theme from '../utils/Chakra/Config';

i18next.init();

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n!.dir(lng));
  
});


import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';
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
    <SessionProvider session={pageProps.session}>
  <Suspense fallback="Loading">

      <AxiosProvider>
        <ChakraProvider theme={theme}>
          <PortalManager>
            <Loading />

            <Component {...pageProps} />
            <ToastProvider motionVariants={gg}/>
            
          </PortalManager>
        </ChakraProvider>
      </AxiosProvider>
    
    </Suspense>    
    </SessionProvider>
  );
}



export default appWithTranslation(MyApp);

