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
import TextF from "../../text";

async function fetcher() {
  return fetch("/api/sound/get-non-approved-sound").then((res) => {
    return res.json();
  });
}

const VoiceReviewer = ({ userType }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const router = useRouter();
  const t = TextF(router.locale);
  /**
   *
   */
  const sound = React.useRef(null);
  const { data, isRefetching, isLoading, error, refetch } = useQuery(
    ["get-word-with-no-pronounsiation"],
    fetcher
  );
  const showData = !isLoading && !isRefetching && !error && !!data;
  const Loading = isLoading || isRefetching;
  const isError = !isLoading && !isRefetching && error && !data;

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
          approve();
          console.log("Approve");
          break;
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

        <div className={Classes.wordWrapper}>
          {showData && (
            <>
              <div className={Classes.audio}>
                <audio
                  ref={sound}
                  controls
                  src={`/sound/${data[0].file_name}`}
                  preload={true}
                />
              </div>

              <div className={Classes.word}>{data[0].ar}</div>
            </>
          )}
          {Loading && <div className={Classes.loading}>يجري جلب الكلمه</div>}
          {isError && <div className={Classes.error}>{error}</div>}
        </div>
      </div>
    </>
  );

  async function approve() {
    axios({
      method: "POST",
      data: { sound_id: data[0].sound_id },
      url: "/api/sound/approve",
    })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
