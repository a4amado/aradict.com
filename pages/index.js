import { verify } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useAlert } from "react-alert";
import Content from "../components/Content";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
const isArabic =
  /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;
import Logo from "../resources/abadis.svg";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { useTranslation } from "next-i18next";

function Home(props, { userType }) {
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
  };

  return (
    <>
      {/* <Header userType={userType} /> */}
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
              <span className={Classes.searchIcon}>{t("search")}</span>
              <input
                className={Classes.searchFeild}
                value={q}
                ref={search}
                onChange={(e) => {
                  const lastCharachter =
                    e.target.value[e.target.value.length - 1];
                  const ss = lastCharachter.match(isArabic);
                  if (!ss && !lastCharachter.match(/\s/)) {
                    alert.error("يسمح فقط بالحروف العربية.");
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
              src="https://www.svgrepo.com/show/80156/down-arrow.svg"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "60px",
              }}
            />
          </span>
        </section>
        <Content />
      </div>
      <Footer />
    </>
  );

  function Submit() {}
}

export default Home;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
        },
      };
    }
  );
};
