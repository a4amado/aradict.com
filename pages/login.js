import Axios from "axios";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAlert } from "react-alert";
import Header from "../components/Header";
import styles from "../styles/style.module.scss";

import { useTranslation } from "react-i18next";

const Login = ({ userType }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const Classes = {
    pageWrapper: styles.pageWrapper,
    form: styles.form,
    formControl: styles.formControl,
    formSubmit: styles.formSubmit,
  };
  return (
    <>
      <Header userType={userType} />
      <div className={Classes.pageWrapper}>
        <Head>Login to Aradict.com</Head>
        <form className={Classes.form} onSubmit={submit}>
          <div className={Classes.formControl}>
            <label>{t("USERNAME")}</label>
            <br />
            <input
              name="ARADICT_USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={Classes.formControl}>
            <label>{t("PASSWORD")}</label>
            <br />
            <input
              type="password"
              name="ARADICT_PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={Classes.formSubmit}>
            <button type="submit">{t("LOGIN")}</button>
          </div>
        </form>
      </div>
    </>
  );

  async function submit(e) {
    e.preventDefault();
    try {
      await Axios({
        method: "POST",
        data: {
          username,
          password,
        },
        url: "/api/" + router.locale + "/login",
      });
      router.reload()
    } catch (error) {
      console.log(error);
    }
  }
};

export default Login;

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getServerSideProps = async ({ req, locale }) => {
  return verify(
    req.cookies.token || "",
    process.env?.JWT_SECRET,
    async (err, data) => {
      if (err) {
        return {
          props: {
            ...(await serverSideTranslations(locale, ["common"])),
          },
        };
      }
      return {
        redirect: {
          destination: "/" + locale,
          permanent: false,
        },
      };
    }
  );
};
