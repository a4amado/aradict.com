import { verify } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useAlert } from "react-alert";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Logo from "../resources/abadis.svg";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { useTranslation } from "next-i18next";
import Autocomplete from "react-autocomplete";

function Home({ userType }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [q, setQ] = React.useState("");
  const alert = useAlert();
  const search = React.useRef();
  React.useEffect(() => {
    search.current.focus();
  }, []);

  const Classes = {
    pageContainer: styles.pageContainer,
    primarySection: styles.primarySection,
    logoContainer: styles.logoContainer,
    searchWrapper: styles.searchWrapper,
    searchIcon: styles.searchIcon,
    searchFeild: styles.searchFeild,
    topBar: styles.topBar,
    content: styles.content,
    goDown: styles.goDown,
    hint: styles.hint,
    contentContainer: styles.contentContainer,
    category: styles.category,
    title: styles.title,
    content: styles.content,
    apps: styles.apps,
    categories: styles.categories,
    footer: styles.footer,
  };

  return (
    <>
      <Header userType={userType} />
      <Head>
        <title>Aradict.com | أرادكت</title>
      </Head>
      <div className={Classes.pageContainer}>
        <section className={Classes.primarySection}>
          <div className={Classes.content}>
            <div className={Classes.logoContainer}>
              <Image src={Logo} width={400} height={150} />
            </div>
            <div className={Classes.searchWrapper}>
              <span className={Classes.searchIcon}>{t("SEARCH")}</span>
              <Autocomplete
                className={Classes.searchFeild}
                value={q || ""}
                ref={search}
                dir="rtl"
                onChange={(e) => {
                  const lastCharachter =
                    e.target.value[e.target.value.length - 1] || "";
                  let isArabic = lastCharachter.isArabic();

                  if (!isArabic && !lastCharachter.match(/\s/)) {
                    alert.error(t("ONLY_AR_LETTERS"));
                    setQ(q);
                  } else {
                    setQ(e.target.value);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    Submit();
                  }
                }}
              />
              <input />
            </div>
          </div>
          <span className={Classes.goDown}>
            <img
              src="https://www.svgrepo.com/show/80156/down-arrow.svg"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "60px",
              }}
            />
          </span>
        </section>
        <div className={Classes.contentContainer}>
          <span className={Classes.category}>{t("WHAT_IS_ARADICT")}</span>
          <p className={Classes.title}>{t("TO_USE_ARADICT")}</p>
          <div className={Classes.content}>
            <br />
            <img
              style={{
                margin: "0 auto",
                display: "block",
                padding: "15px",
                width: "100%",
                height: "auto",
                maxWidth: "500px",
              }}
              src="Dictionary.jpg"
            />
            <br />
            {t("LOREM_IPSUM")}
            <br />
            <img
              style={{
                margin: "0 auto",
                display: "block",
                padding: "15px",
                width: "100%",
                height: "auto",
                maxWidth: "500px",
              }}
              src="Dictionary.jpg"
            />
            <br />
            {t("LOREM_IPSUM")}
            {t("LOREM_IPSUM")}
            <br />
            <img
              style={{
                margin: "0 auto",
                display: "block",
                padding: "15px",
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
              src="Dictionary.jpg"
            />
            <br />
            {t("LOREM_IPSUM")}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  function Submit() {}
}

export default Home;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Autocomplete from "react-autocomplete";

export const getServerSideProps = async ({ req, locale }) => {
  console.log();
  return verify(
    req.cookies.token || "",
    process.env.JWT_SECRET,
    async (err, data) => {
      const userType = data?.role || "";
      return {
        props: {
          userType,
          ...(await serverSideTranslations(locale, ["common"])),
          dir: locale,
        },
      };
    }
  );
};
