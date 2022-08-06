import { useQuery } from "@tanstack/react-query";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import React from "react";
import styles from "../../styles/voice-reviewer.module.scss";
import { SecondLayer } from "../../utils/AuthLayers";
import { hint } from "../../styles/add-sound.module.scss";
import Hints from "../../components/Hints/Hints";
import Header from "../../components/Header";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";


const VoiceReviewer = ({ userType }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  async function fetcher() {
    return fetch(
      "/api/" + router.locale + "/sound/get-non-approved-sound"
    ).then((res) => {
      return res.json();
    });
  }
  const sound = React.useRef(null);
  const { data, isRefetching, isLoading, error, refetch } = useQuery(
    ["get-word-with-no-pronounsiation"],
    fetcher,
    {
      refetchOnWindowFocus: false,
    }
  );

  const showData = !isLoading && !isRefetching && !error && !!data;
  const Loading = isLoading || (isRefetching && !error && !data);
  const isError = !isLoading && !isRefetching && error && !data;

  const Classes = {
    pageWrapper: styles.pageWrapper,
    wordWrapper: styles.wordWrapper,
    hint: hint,
    word: styles.word,
    audio: styles.audio,
  };

  function play() {
    if (!data) {
      return false;
    }
    sound.current.play();
  }

  function pause() {
    if (!data) {
      return false;
    }
    sound.current.pause();
  }

  React.useEffect(() => {
    function handle(e) {
      switch (e.code) {
        case "KeyP":
          play();
          console.log("play");
          break;
        case "KeyA":
          approve();
          console.log("Approve");
          break;
        case "KeyR":
          reject();
          break;
        default:
          return false;
          break;
      }
    }
    document.addEventListener("keyup", handle);
    return () => document.removeEventListener("keyup", handle);
  });
  return (
    <>
      <Header userType={userType} />
      <div className={Classes.pageWrapper}>
        <Hints>
          <span onClick={reject} className={Classes.hint}>
            \r\ {t("REJECT")}
          </span>
          <span onClick={approve} className={Classes.hint}>
            \p\ {t("PLAY")}
          </span>
          <span className={Classes.hint}>\a\ {t("APPROVE")}</span>
        </Hints>
        <Head>
          <title>Review Sound</title>
        </Head>

        <div className={Classes.wordWrapper}>
          <>
            <div className={Classes.audio}>
              <audio
                ref={sound}
                controls
                src={`/sound/${data && data[0].file_name}`}
                preload={true}
              />
            </div>

            <div className={Classes.word}>
              {Loading && t("SEARCHING") + "......"}
              <br />
              {showData && data[0].ar}
              <br />
              {isError && (
                <div className={Classes.error}>{t("SOMETHING_WENT_WRONG")}</div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );

  async function approve() {
    if (!data) {
      return false;
    }
    axios({
      method: "POST",
      data: { sound_id: data[0].sound_id },
      url: "/api/" + router.locale + "/sound/approve",
    })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function reject() {
    if (!data) return false;

    axios({
      method: "POST",
      data: { sound_id: data[0].sound_id },
      url: "/api/" + router.locale + "/sound/reject",
    })
      .then((e) => {})
      .catch((e) => {
        console.log(e);
      });
  }
};

export default VoiceReviewer;

  


export const getServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET;
  
  const data = verify(TOKEN, JWT_SECRET);
  if (!data || !SecondLayer.includes(data.role))
    return {
      redirect: {
        destination: "/" + locale,
        permanent: false,
      },
    };

  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return {
    props: {
      ...translation,
      userType
    }
  }
};
