import i18next from "i18next";
import { useRouter } from "next/router";
import React from "react";
import styles from "./locales.module.scss";
const langs = {
  en: { name: " English 🇺🇸 " },
  ar: { name: " arabic 🇸🇦 " },
  es: { name: " Español 🇪🇸 " },
  nl: { name: " Nederlands 🇳🇱 " },
  id: { name: " Indonesia 🇮🇩 " },
};

export default function Locales() {
  let { asPath, locale, pathname, query, push, locales, reload } =
    useRouter();
  return (
    <select
      className={styles.locales}
      defaultValue={locale}
      onChange={(e) => {
        i18next.changeLanguage(e.target.value).then(() => {
          push({ pathname, query }, asPath, { locale: e.target.value })
          
        });
      }}
      
    >
      {locales.map((code) => {
        return (
          <option key={code} value={code}>
            {langs[code].name}
          </option>
        );
      })}
    </select>
  );
}
export { langs };
