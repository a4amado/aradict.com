import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "nprogress/nprogress.css";
import { appWithTranslation } from "next-i18next";

import React, { Suspense } from "react";

import nProgress from "nprogress";
import { Router } from "next/router";
import Locales from "../components/Locales";

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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // const userType = pageProps.userType;
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <QueryClientProvider client={queryClient}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Component {...pageProps} />
          <Locales />
        </AlertProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default appWithTranslation(MyApp);
