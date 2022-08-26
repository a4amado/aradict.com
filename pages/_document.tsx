import i18next from "i18next";
import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import React from "react";

export default function Document(ctx: DocumentContext) {
   return (
    <Html dir={i18next.dir(ctx.locale)} lang={ctx.locale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />        
      </body>
    </Html>
  );
}
