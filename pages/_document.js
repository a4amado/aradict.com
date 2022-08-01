import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ __NEXT_DATA__ }) {
  const lang = __NEXT_DATA__.props.pageProps.defaultLang;
  return (
    <Html lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
