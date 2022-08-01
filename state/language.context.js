import { setCookie, getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { createContext } from "react";
import ar from "../resources/languages/ar.json";
import en from "../resources/languages/en.json";
import es from "../resources/languages/es.json";
import { select } from "../styles/word.module.scss";

function getLang(lang) {
  switch (lang) {
    case "ar":
      return ar;
    case "en":
      return en;
    case "es":
      return es;

    default:
      return ar;
  }
}

const MultiLanguageContext = createContext();
const MultiLanguage = ({ children, defaultLang }) => {
  const router = useRouter();
  const languagesAvilable = [
    {
      name: "Arabic",
      code: "ar",
    },
    {
      name: "English",
      code: "en",
    },
    {
      name: "Español",
      code: "es",
    },
  ];
  const [activeLanguage, setActiveLanguage] = React.useState(
    getLang(defaultLang)
  );
  function setLanguage(lang) {
    setActiveLanguage(getLang(lang));
    router.reload();
  }
  function setLang(e) {
    if (getCookie("lang") === e.target.value) {
      return false;
    }
    setCookie("lang", e.target.value);
    router.reload();
  }
  return (
    <MultiLanguageContext.Provider
      value={{
        languagesAvilable,
        setLanguage,
        activeLanguage,
      }}
    >
      <select onChange={setLang} className={select}>
        {languagesAvilable.map((e) => {
          return (
            <option
              selected={defaultLang === e.code}
              key={e.code}
              value={e.code}
            >
              {e.name}
            </option>
          );
        })}
      </select>
      <Head>
        <link
          rel="stylesheet"
          href={activeLanguage.dir === "ltr" ? "ltr.css" : "rtl.css"}
          fetchpriority="high"
        />
      </Head>
      {children}
    </MultiLanguageContext.Provider>
  );
};

export { MultiLanguage, MultiLanguageContext };
