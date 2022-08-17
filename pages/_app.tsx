import theme from "../utils/Chakra/Config";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import { appWithTranslation, i18n } from "next-i18next";
import i18next from "i18next";
i18next.init();

import nProgress from "nprogress";

import React from "react";

import { Router } from "next/router";

import AxiosProvider from "../utils/AxiosConfig";
import { ChakraProvider, PortalManager } from "@chakra-ui/react";

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n!.dir(lng));
});

nProgress.configure();
Router.events.on("routeChangeStart", () => {
  nProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  nProgress.done();
});

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const userType: string = pageProps.userType;

  return (
    <AxiosProvider>
      <ChakraProvider theme={theme}>
        <PortalManager>
          <Component {...pageProps} userType={userType} />
        </PortalManager>
      </ChakraProvider>
    </AxiosProvider>
  );
}

export default appWithTranslation(MyApp);
