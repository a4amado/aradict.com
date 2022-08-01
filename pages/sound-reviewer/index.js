import { useQuery } from "@tanstack/react-query";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import React from "react";
import styles from "../../styles/voice-reviewer.module.scss";
import { SecondLayer } from "../../utils/AuthLayers";
import { hint } from "../../styles/add-sound.module.scss";
import Hints from "../../components/Hints/Hints";
import Header from "../../components/Header";

async function fetcher() {
  return new Promise((res, rej) => {
    res({
      ar: "AHMAD",
      id: "أنا",
      sound:
        "https://file-examples.com/storage/fe52cb0c4862dc676a1b341/2017/11/file_example_MP3_700KB.mp3",
    });
  });
}

const VoiceReviewer = ({ userType }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  /**
   *
   */
  const sound = React.useRef(null);
  const { data, isRefetching, isLoading, error } = useQuery(
    ["get-word-with-no-pronounsiation"],
    fetcher
  );

  const Classes = {
    pageWrapper: styles.pageWrapper,
    wordWrapper: styles.wordWrapper,
    hint: hint,
    word: styles.word,
    audio: styles.audio,
  };

  function play() {
    sound.current.play();
  }

  function pause() {
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
          console.log("Approve");
        case "KeyF":
          console.log("Refused");
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
          <span className={Classes.hint}>\r\ Reject</span>
          <span className={Classes.hint}>\p\ Play</span>
          <span className={Classes.hint}>\a\ Approve</span>
        </Hints>
        <Head>
          <title>Review Sound</title>
        </Head>
        {isLoading ||
          (isRefetching && (
            <div className={Classes.loading}>يجري جلب الكلمه</div>
          ))}
        {error && <div className={Classes.error}>{error}</div>}
        {data && (
          <div className={Classes.wordWrapper}>
            <div className={Classes.audio}>
              <audio ref={sound} controls src={data.sound} preload={true} />
            </div>
            <div className={Classes.word}>{data.ar}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceReviewer;

export const getServerSideProps = async (ctx) => {
  return verify(ctx.req.cookies.token, process.env.JWT_SECRET, (err, data) => {
    if (err || !SecondLayer.includes(data.role)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const defaultLang = ctx.req.cookies.lang || "";
    const userType = data?.role || "";

    return {
      props: {
        userType,
        defaultLang,
      },
    };
  });
};
