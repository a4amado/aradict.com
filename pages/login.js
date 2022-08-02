import Axios from "axios";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAlert } from "react-alert";
import Header from "../components/Header";
import styles from "../styles/style.module.scss";
import TextF from "../text";

const Login = ({ userType }) => {
  const router = useRouter();
  const t = TextF(router.locale);
  const alert = useAlert();

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
            <label>إسم المستخدم</label>
            <br />
            <input
              name="ARADICT_USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={Classes.formControl}>
            <label>كلمة السر</label>
            <br />
            <input
              type="password"
              name="ARADICT_PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={Classes.formSubmit}>
            <button type="submit">تسجيل</button>
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
        url: "/api/login",
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }
};

export default Login;

export const getServerSideProps = async (ctx) => {
  return verify(
    ctx.req.cookies.token || "",
    process.env?.JWT_SECRET,
    (err, data) => {
      if (err) {
        const defaultLang = ctx.req.cookies.lang || "";

        return {
          props: {
            defaultLang,
          },
        };
      }
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  );
};
