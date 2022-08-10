import React from "react";
import styles from "../../styles/add-sound.module.scss";
import { useAlert } from "react-alert";
import { verify } from "jsonwebtoken";
import { FirstLayer } from "../../utils/AuthLayers";
import Head from "next/head";
import Hints from "../../components/Hints";
import FormData from "form-data";
import Axios from "axios";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { msg } from "../../styles/Message.module.scss";
import Spinner from "../../components/Spinner";

let chunks = [];
function FreeChunks() {
  chunks = [];
}

export default function AddSound({ userType }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [LoadingSuccess, setLoadingSuccess] = React.useState(false);
  const [LoadingFails, setLoadingFails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [SubmittingSuccess, setSubmittingSuccess] = React.useState(false);
  const [SubmittingFails, setSubmittingFails] = React.useState(false);
  const [isRecordeing, setIsRecording] = React.useState(false);
  const [data, setData] = React.useState([]);
  const disableShortcuts =
    isLoading || isSubmitting || data.length === 0;

  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation();
  let mediaStream = React.useRef(null);
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

  const Classes = {
    addSoundWrapper: styles.addSoundWrapper,
    alerts: styles.alerts,
    centerd: styles.centerd,
    alert: styles.alert,
    msg: styles.message,
    shortcuts: styles.shortcuts,
    recording: isRecordeing ? styles.recording : "",
    buttons: styles.buttons,
    hint: styles.hint,
  };

  // Initalize shortcuts
  React.useEffect(() => {
    function handler(e) {
      
      switch (e.code) {
        case "KeyF":
          fetcher();
          break;

        default:
          break;
      }
      // Disable shortcuts while submitting or loading
      if (disableShortcuts) return false;
      switch (e.code) {
        case "KeyR":
          Recorde();
          break;
        case "KeyW":
          Stop();
          break;
        case "KeyS":
          Submit();
          break;
        case "KeyP":
          Play();
          break;
        case "KeyC":
          resetRecorded();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keyup", handler);
    return () => document.removeEventListener("keyup", handler);
  });

  return (
    <>
      <Header userType={userType} />
      <div className={Classes.addSoundWrapper}>
        <Head>
          <title>{}</title>
        </Head>
        <Hints>
          <button
            disabled={disableShortcuts}
            className={Classes.hint}
            onClick={Recorde}
          >
            \r\ {t("RECORD")}
            <span className={Classes.recording}></span>
          </button>
          <button
            disabled={disableShortcuts}
            className={Classes.hint}
            onClick={Stop}
          >
            \w\ {t("STOP_RECORDING")}
          </button>
          <button
            disabled={disableShortcuts}
            className={Classes.hint}
            onClick={Play}
          >
            \p\ {t("PLAY")}
          </button>
          <button
            disabled={disableShortcuts}
            className={Classes.hint}
            onClick={fetcher}
          >
            \f\ {t("Fetch")}
          </button>
          <button
            disabled={disableShortcuts}
            className={Classes.hint}
            onClick={resetRecorded}
          >
            \q\ {t("RESET")}
          </button>

          <button disabled={disableShortcuts} className={Classes.hint}>
            \s\ {t("SUBMIT")}
          </button>
        </Hints>
        <div className={Classes.centerd}>
          {isLoading && <div className={msg}><Spinner/></div>}

          {LoadingSuccess && data[0]?.ar}

          {LoadingFails && <div className={msg}>Something went wrong</div>}
          {isSubmitting && <div className={msg}><Spinner/> </div>}
          {SubmittingSuccess && (
            <div className={msg} onClick={fetcher}>
              <Spinner/>
              {/* Success!!, To Fetch a newWord press /f/ or client here */}
            </div>
          )}
          {SubmittingFails && "Something went wrong"}
        </div>
      </div>
    </>
  );

  function Recorde() {
    if (isRecordeing) {
      alert.error(t("ALREADY_RECORDING"));
      return false;
    }
    alert.show(t("RECORD"));
    FreeChunks();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((e) => {
        chunks = [];

        mediaStream.current = new MediaRecorder(e, {
          mimeType: "audio/webm;codecs=opus",
        });

        mediaStream.current.ondataavailable = (newData) => {
          chunks = [...chunks, newData.data];
        };
        mediaStream.current.start();

        mediaStream.current.onstop = () => {
          e.getTracks().forEach((track) => {
            if (track.readyState != "inactive") {
              track.stop();
            }
          });
          setIsRecording(false);
        };
      })

      .catch((e) => {
        console.error(e);
      });
    setIsRecording(true);
  }

  function Stop() {
    if (!isRecordeing) {
      alert.error(t("NOT_RECORDING_YET"));
      return false;
    } else {
      mediaStream.current.stop();
      alert.show(t("STOP_RECORDING"));
    }
  }

  function Play() {
    if (chunks.length < 1) {
      return alert.error(t("NO_THING"));
    }
    const AudioBlob = new Blob(chunks, { type: "audio/ogg" });
    const AudioBlobURL = URL.createObjectURL(AudioBlob);
    let mySound = new Audio(AudioBlobURL);
    mySound.play();
    return;
  }

  async function fetcher() {
    ToogleLoading("show");
    setData([]);
    return Axios({
      mathod: "GET",
      url: `/api/word/get-word-with-no-sound`,
    })
      .then((e) => {
        setData(e.data);
        ToogleLoadingSuccess("show");
      })
      .catch((err) => {
        ToogleLoadingFails("show");
      });
  }

  function Submit() {
    if (chunks.length < 1 || !data) {
      return alert.error(t("NO_THING"));
    }

    ToogleIsSubmitting("show");
    const blob = new Blob(chunks, { type: "ogg/audio" });
    const Sound = new FormData();
    Sound.append("audio", blob);
    Sound.append("word_id", data[0].word_id);
    Axios({
      method: "POST",
      url: "/api/sound/add-to-queue",
      data: Sound,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((e) => {
        alert.success("SUBMITTED");

        setTimeout(() => {
          ToogleLoading("show");
          setTimeout(() => {
            fetcher();
          }, 500);
        }, 500);
      })
      .catch((e) => {
        ToogleLoadingFails("show");
      });
  }

  function resetRecorded() {
    console.log("Reset");
    FreeChunks();
    console.log(chunks);
    mediaStream.current = null;
  }
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../../utils/redirect";
 
export const getServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;

  const data = verify(TOKEN, JWT_SECRET, (err, data) => (!err ? data : false));
  if (!data || !FirstLayer.includes(data.role)) return Redirect("/", false);

  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return {
    props: {
      ...translation,
      userType,
    },
  };
};
