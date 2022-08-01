import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "nprogress/nprogress.css";

import React from "react";
import Header from "../components/Header";

import nProgress from "nprogress";
import { Router } from "next/router";
import { MultiLanguage } from "../state/language.context";
import Head from "next/head";

nProgress.configure();
Router.events.on("routeChangeStart", () => {
  nProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  nProgress.done();
});

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: "5px",

  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const userType = pageProps.userType;
  return (
    <QueryClientProvider client={queryClient}>
      <MultiLanguage defaultLang={pageProps.defaultLang || "ar"}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Component {...pageProps} />
        </AlertProvider>
      </MultiLanguage>
    </QueryClientProvider>
  );
}

export default MyApp;
