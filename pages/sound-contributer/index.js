import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import styles from "../../styles/add-sound.module.scss";

import { useAlert } from "react-alert";
import { verify } from "jsonwebtoken";
import { FirstLayer, ThirdLayer } from "../../utils/AuthLayers";
import Head from "next/head";
import Hints from "../../components/Hints";
import FormData from "form-data";
import Axios from "axios";
import Header from "../../components/Header";

let chunks = [];
const MSGsArray = Object.freeze({
  NOT_RECORDING_YET: {
    type: "error",
    des: "NOT_RECORDING_YET",
    msg: "نحن لم نبدأ التسجيل حتي الان",
  },
  ALREADY_RECORDING: {
    type: "error",
    msg: "يجري التسجيل بالفعل.",
    des: "ALREADY_RECORDING",
  },
  START_RECORDING: {
    type: "msg",
    msg: "جاري التسجيل.",
    des: "START_RECORDING",
  },
  STOP_RECORDING: {
    type: "msg",
    msg: "تم ٌإيقاف التسجيل",
    des: "STOP_RECORDING",
  },
});
export default function AddSound({ userType }) {
  let mediaStream = React.useRef(null);
  const alert = useAlert();

  const [isRecordeing, setIsRecording] = React.useState(false);
  const { data, isLoading, isRefetching, error, refetch } = useQuery(
    ["getRandomWord"],
    () => {
      return new Promise((res, rej) => {
        return res({
          ar: "انا",
        });
      });
    }
    // fetch(`/api/hello`).then(async (e) => {
    // const data = await e.json();
    // return data;
    // })
  );

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
      return Stop();
    }
    alert.show(MSGsArray.START_RECORDING.msg);
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
      return alert.show(MSGsArray.NOT_RECORDING_YET.msg);
    }

    mediaStream.current.stop();
    return alert.show(MSGsArray.STOP_RECORDING.msg);
  }
  function Play() {
    if (chunks.length < 1) {
      return alert.show("No thing to play !");
    }
    const AudioBlob = new Blob(chunks, { type: "audio/ogg" });
    const AudioBlobURL = URL.createObjectURL(AudioBlob);
    let mySound = new Audio(AudioBlobURL);
    mySound.play();
  }
  function Submit() {
    if (chunks.length < 1) {
      return alert.show("No thing to Submit !");
    }
    const blob = new Blob(chunks, { type: "ogg/audio" });
    const Sound = new FormData();
    Sound.append("audio", blob);
    Axios({
      method: "POST",
      url: "/api/sound/add-to-queue",
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
          <title>Contribute Sound</title>
        </Head>
        <Hints>
          <span className={Classes.hint} onClick={Recorde}>
            \r\ {isRecordeing ? "Stop.." : "Record"}
            <span className={Classes.recording}></span>
          </span>
          <span className={Classes.hint} onClick={Play}>
            \p\ Play
          </span>
          <span className={Classes.hint}>\s\ Submit</span>
        </Hints>
        <div className={Classes.centerd}>
          {isLoading || isRefetching ? error : ""}
          {data ? data?.ar : ""}
          {error ? alert.show("خطأ أثناء جلب الكلمة :(") : ""}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  return verify(ctx.req.cookies.token, process.env.JWT_SECRET, (err, data) => {
    if (err || !FirstLayer.includes(data.role))
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
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
