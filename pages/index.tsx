import { verify } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Logo from "../resources/abadis.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import isArabic from "../utils/isArabic";

function Home({ userType }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [q, setQ] = React.useState("");
  const toast = useToast();
  
  const search = React.useRef<HTMLInputElement>();
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
              <Image alt="s" src={Logo} width={400} height={150} />
            </div>
            <div className={Classes.searchWrapper}>
              <span className={Classes.searchIcon}>{t("SEARCH")}</span>
              <input
                className={Classes.searchFeild}
                value={q || ""}
                ref={search}
                dir="rtl"
                onChange={(e) => {
                  const lastCharachter =
                    e.target.value[e.target.value.length - 1] || "";
                  let isLetterArabic = isArabic.validate(({ word: lastCharachter }))

                  if (!isLetterArabic && !lastCharachter.match(/\s/)) {
                    toast({
                      duration: 2000,
                      status: "error",
                      position: "top",
                      isClosable: true,
                    });

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
            </div>
          </div>
          <span className={Classes.goDown}>
            <img
            alt="s"
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
        <Tag variant="solid" colorScheme="teal" size="lg">{t("WHAT_IS_ARADICT")}</Tag>
          <p className={Classes.title}>{t("TO_USE_ARADICT")}</p>
          <div className={Classes.content}>
            <br />
            <img
            alt="s"
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
            alt="s"
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
            alt="ddddddd"
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
import { Tag, useToast } from "@chakra-ui/react";
 

export async function getServerSideProps({ req, locale }) {
  const TOKEN = req.cookies?.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  let data = verify(TOKEN, JWT_SECRET, (err, data) => !err ? data : false);
  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return { props: { userType, ...translation } };
}
