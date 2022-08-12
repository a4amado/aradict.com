import "nprogress/nprogress.css";
import "../styles/globals.css";

import { appWithTranslation, i18n } from "next-i18next";
import React  from "react";
import nProgress from "nprogress";
import { Router } from "next/router";
import i18next from "i18next";
import AxiosProvider from "../utils/AxiosConfig";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/Chakra/Config";
import scrollDetector from "scroll-detector";



String.prototype!.isArabic = function (word) {
  let AR =
    /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;

  if (word) {
    return !this.split("")
      .map((char) => (char.isArabic() ? "" : "N"))
      .join("")
      .toString();
  }

  return this.match(AR);
};

i18next.init();
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


import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  const userType: string = pageProps.userType;

  return (
    <AxiosProvider>
      <ChakraProvider theme={theme}>
           <Component {...pageProps} userType={userType} />
 
        </ChakraProvider>
    </AxiosProvider>
  );
}

export default appWithTranslation(MyApp);
