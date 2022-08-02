import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./locales.module.scss";
const langs = {
  "en-US": { name: "English" },
  "ar-EG": { name: "arabic" },
  "es-ES": { name: "Español" },
  "nl-NL": { name: "Nederlands" },
  "id-ID": { name: "Indonesia" },
};

export { langs };

export default function Locales() {
  let { asPath, locale, pathname, query, reload, replace, locales } =
    useRouter();
  console.log(locales);
  return (
    <select
      className={styles.locales}
      onChange={(e) => {
        replace({ pathname, query }, asPath, { locale: e.target.value });
      }}
    >
      {locales.map((code) => {
        return (
          <option selected={code == locale} key={code} value={code}>
            {langs[code].name}
          </option>
        );
      })}
    </select>
  );
}
