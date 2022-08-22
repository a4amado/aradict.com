/* eslint-disable @next/next/no-img-element */
import "../styles/globals.css";
import "../resources/abadis.svg";

import theme from "../utils/Chakra/Config";

import { appWithTranslation, i18n } from "next-i18next";
import i18next from "i18next";
i18next.init();

import React from "react";

import AxiosProvider from "../utils/AxiosConfig";
import {
  Box,
  ChakraProvider,
  Portal,
  PortalManager,
  Spinner,
  useBoolean,
} from "@chakra-ui/react";

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n!.dir(lng));
});

import type { AppProps } from "next/app";
import Loading from "../components/Loading";
import PagePropsProvider from "../utils/PagePropsInComponents";










function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}
function MyApp({ Component, pageProps }: AppProps) {
  const userType: string = pageProps.userType;

  return (
    <PagePropsProvider value={pageProps}>
      <AxiosProvider>
        <ChakraProvider theme={theme}>
          <PortalManager>            
            <Loading />
            <Component {...pageProps} />
          </PortalManager>
        </ChakraProvider>
      </AxiosProvider>
    </PagePropsProvider>
  );
}



export default appWithTranslation(MyApp);

