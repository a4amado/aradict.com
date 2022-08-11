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
import Redirect from "../../utils/redirect";
import Spinner from "../../components/Spinner";
import { msg } from "../../styles/Message.module.scss";
import { useAlert } from "react-alert";

const VoiceReviewer = ({ userType }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [LoadingSuccess, setLoadingSuccess] = React.useState(false);
  const [LoadingFails, setLoadingFails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [SubmittingSuccess, setSubmittingSuccess] = React.useState(false);
  const [SubmittingFails, setSubmittingFails] = React.useState(false);

  const [data, setData] = React.useState([]);
  const disableShortcuts = isLoading || isSubmitting || data.length === 0;

  const alert = useAlert();
  let soundRef = React.useRef(null);
  React.useEffect(() => {
    fetcher();
  }, []);

  function ToogleLoading(status) {
    setIsLoading(status === "show" ? true : false);
    setLoadingSuccess(false);
    setLoadingFails(false);
    setIsSubmitting(false);
    setSubmittingSuccess(false);
    setSubmittingFails(false);
  }

  function ToogleLoadingSuccess(status) {
    setIsLoading(false);
    setLoadingSuccess(status === "show" ? true : false);
    setLoadingFails(false);
    setIsSubmitting(false);
    setSubmittingSuccess(false);
    setSubmittingFails(false);
  }

  function ToogleLoadingFails(status) {
    setIsLoading(false);
    setLoadingSuccess(false);
    setLoadingFails(status === "show" ? true : false);
    setIsSubmitting(false);
    setSubmittingSuccess(false);
    setSubmittingFails(false);
  }

  function ToogleIsSubmitting(status) {
    setIsLoading(false);
    setLoadingSuccess(false);
    setLoadingFails(false);
    setIsSubmitting(status === "show" ? true : false);
    setSubmittingSuccess(false);
    setSubmittingFails(false);
  }

  function ToogleSubmittingSuccess(status) {
    setIsLoading(false);
    setLoadingSuccess(false);
    setLoadingFails(false);
    setIsSubmitting(false);
    setSubmittingSuccess(status === "show" ? true : false);
    setSubmittingFails(false);
  }

  function ToogleSubmittingFails(status) {
    setIsLoading(false);
    setLoadingSuccess(false);
    setLoadingFails(false);
    setIsSubmitting(false);
    setSubmittingSuccess(false);
    setSubmittingFails(status === "show" ? true : false);
  }

  const router = useRouter();
  const { t } = useTranslation();

  async function fetcher() {
    ToogleLoading("show");
    setData([]);
    // return axios({
    //   method: "GET",
    //   url: "/api/sound/get-non-approved-sound",
    // })
    //   .then((e) => {
    //     setData(e.data);
    //     ToogleLoadingSuccess("show");
    //   })
    //   .catch((err) => {
    //     ToogleLoadingFails("show");
    //   });

    return new Promise((res, rej) => {
      const Sound = {
        ar: "أنا",
        en: "I",
        file_name: "fb3da276-6b3f-4f2b-a467-fc363675a490.mp3",
        sound_id: "7a16995e-b721-4fb5-ab3e-14ec479923fe",
        word_id: "1379fef1-34eb-47e4-88d9-c5ac519afcce",
      };

      return setTimeout(() => {
         setData([Sound]);
         ToogleLoadingSuccess("show")
      }, 1000);
    });
  }
  React.useEffect(() => {
    fetcher();
  }, []);

  const sound = React.useRef(null);

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
    soundRef.current.play();
  }

  function pause() {
    if (!data) {
      return false;
    }
    soundRef.current.pause();
  }

  React.useEffect(() => {
    function handle(e) {
      if (disableShortcuts) return false;
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
        {console.log(data)}
        <Hints>
          <button
            disabled={disableShortcuts}
            onClick={reject}
            className={Classes.hint}
          >
            \r\ {t("REJECT")}
          </button>
          <button
            disabled={disableShortcuts}
            onClick={approve}
            className={Classes.hint}
          >
            \p\ {t("PLAY")}
          </button>
          <button disabled={disableShortcuts} className={Classes.hint}>
            \a\ {t("APPROVE")}
          </button>
        </Hints>
        <Head>
          <title>Review Sound</title>
        </Head>

        <div className={Classes.wordWrapper}>
          <>
            <div className={Classes.word}>
              {isLoading && (
                <div className={msg}>
                  <Spinner />
                </div>
              )}

              {isSubmitting && (
                <div className={msg}>
                  <Spinner />
                </div>
              )}

              {LoadingSuccess && (
                <div className={msg}>
                  <audio
                    ref={soundRef}
                    controls={true}
                    src={`sound/${data[0]?.file_name}`}
                  ></audio>
                  <div>
                    {data[0]?.ar} - {data[0]?.en}
                  </div>
                </div>
              )}

              {LoadingFails && <div className={msg}>Something went wrong</div>}

              {SubmittingFails && "Something went wrong"}
            </div>
          </>
        </div>
      </div>
    </>
  );

  async function approve() {
    if (!data) return false;
    ToogleIsSubmitting("show");
    try {
      // await axios({
      //   method: "POST",
      //   data: { sound_id: data[0].sound_id },
      //   url: "/api/sound/approve",
      // });

      return setTimeout(() => {
        setTimeout(() => {
          ToogleLoading("show");
          alert.success("Approves");
          setTimeout(() => {
            fetcher();
          }, 500);
        }, 500);
      }, 1000);
    } catch (error) {
      ToogleLoadingFails("show");
    }
  }

  async function reject() {
    if (!data) return false;

    ToogleIsSubmitting("show");
    try {
      
        
        setTimeout(() => {
          alert.success("Rejected");
          ToogleLoading("show");
          setTimeout(() => {
            fetcher();
          }, 500);
        }, 500);
      

    } catch (error) {
      setTimeout(() => {
        ToogleIsSubmitting("show");
        alert.success("Rejected");
        setTimeout(() => {
          fetcher();
        }, 500);
      }, 500);

      console.error(error);
    }
  }
};

export default VoiceReviewer;

export const getServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET;
  const data = verify(TOKEN, JWT_SECRET, (err, data) => (!err ? data : false));

  if (!data || !SecondLayer.includes(data.role)) return Redirect("/", false);
  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return {
    props: {
      ...translation,
      userType,
    },
  };
};

/**
 *
 *
 * isLoading
 * isSubmiting
 * disableShortcuts
 *
 * Error
 * Didn't find Words
 *
 *
 *
 *
 *
 */
