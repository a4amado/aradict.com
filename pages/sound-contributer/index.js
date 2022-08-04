import { useQuery } from "@tanstack/react-query";
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
let chunks = [];

export default function AddSound({ userType }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  let mediaStream = React.useRef(null);
  const alert = useAlert();

  const [isRecordeing, setIsRecording] = React.useState(false);
  const { data, isLoading, isRefetching, error, refetch } = useQuery(
    ["get-word-with-no-sound"],
    () =>
      fetch(`/api/${router.locale}/word/get-word-with-no-sound`).then(
        async (e) => {
          const data = await e.json();
          return data;
        }
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const showData = !isLoading && !isRefetching && !error && !!data;
  const Loading = isLoading || isRefetching;
  const isError = !isLoading && !isRefetching && error && !data;

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

  function Recorde() {
    if (isRecordeing) {
      alert.error(t("ALREADY_RECORDING"));
      return false;
    }
    alert.show(t("RECORD"));
    chunks = [];
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
  }
  function Submit() {
    if (chunks.length < 1 || !data) {
      return alert.error(t("NO_THING"));
    }

    const blob = new Blob(chunks, { type: "ogg/audio" });
    const Sound = new FormData();
    Sound.append("audio", blob);
    Sound.append("word_id", data[0].word_id);
    Axios({
      method: "POST",
      url: "/api/" + router.locale + "/sound/add-to-queue",
      data: Sound,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((e) => {})
      .catch((e) => {});
  }

  React.useEffect(() => {
    function handler(e) {
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
          <span className={Classes.hint} onClick={Recorde}>
            \r\ {t("RECORD")}
            <span className={Classes.recording}></span>
          </span>
          <span className={Classes.hint} onClick={Stop}>
            \w\ {t("STOP_RECORDING")}
          </span>

          <span className={Classes.hint} onClick={Play}>
            \p\ {t("PLAY")}
          </span>

          <span className={Classes.hint}>\s\ {t("SUBMIT")}</span>
        </Hints>
        <div className={Classes.centerd}>
          {Loading && t("SEARCHING") + " ...... "}
          {isError && t("SOMETHING_WENT_WRONG")}
          {showData && data[0]?.ar}
        </div>
      </div>
    </>
  );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ req, locale }) => {
  return verify(
    req.cookies.token,
    process.env.JWT_SECRET,
    async (err, data) => {
      if (err || !FirstLayer.includes(data.role))
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
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
