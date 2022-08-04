import "nprogress/nprogress.css";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { appWithTranslation, i18n } from "next-i18next";
import React, { Suspense } from "react";
import nProgress from "nprogress";
import { Router } from "next/router";
import Locales from "../components/Locales";
import i18next from "i18next";

String.prototype.isArabic = function () {
  let AR =
    /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;

  return this.match(AR);
};

i18next.init();
i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", i18n.dir(lng));
});

nProgress.configure();
Router.events.on("routeChangeStart", () => {
  nProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  nProgress.done();
});

// optional configuration
const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: "5px",
  transition: transitions.SCALE,
};
// if (typeof window !== "undefined") {

// }

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const userType = pageProps.userType;
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <QueryClientProvider client={queryClient}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Component {...pageProps} userType={userType} />
          <Locales />
        </AlertProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default appWithTranslation(MyApp);
