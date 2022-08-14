import React from "react";
import { verify } from "jsonwebtoken";
import { FirstLayer } from "../../utils/AuthLayers";
import Head from "next/head";

import FormData from "form-data";
import Axios from "axios";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

let chunks = [];
function FreeChunks() {
  chunks = [];
}
const indicate = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const indicateClass = css`
  animation: ${indicate} 1s ease infinite;
`;

export default function AddSound({ userType }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [LoadingSuccess, setLoadingSuccess] = React.useState(false);
  const [LoadingFails, setLoadingFails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [SubmittingSuccess, setSubmittingSuccess] = React.useState(false);
  const [SubmittingFails, setSubmittingFails] = React.useState(false);
  const [isRecordeing, setIsRecording] = React.useState(false);
  const [data, setData] = React.useState([]);
  const disableShortcuts = isLoading || isSubmitting || data.length === 0;

  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();
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
      <Head>
        <title>{}</title>
      </Head>

      <Center
        h="100%"
        w="100%"
        m="10px auto"
        overflow="hidden"
        position="relative"
        maxW={600}
      >
        <Center
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          left={0}
          backgroundColor="white"
        >
          <Spinner />
        </Center>
        <Center fontSize={20} height="100%" w="100%" h={200} bg="#fff"></Center>
      </Center>

      <Box
        maxWidth="calc(800px + (10px * 3))"
        width="100%"
        m="10px auto"
        bg="#fff"
        borderRadius={10}
      >
        <Center paddingTop={10}>
          <Heading as="h5">Controllers</Heading>
        </Center>
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          width="100%"
          gap="10px"
          p={10}
        >
          <GridItem textAlign="center">
            <Button
              disabled={disableShortcuts}
              onClick={Play}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">P</Kbd> <Text m="0 10px">{t("PLAY")}</Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center" position="relative">
          <Circle
              position="absolute"
              top="10px"
              right="10px"
              css={indicateClass}
              bg="red"
              zIndex={2}
              size={4}
            />
            <Button
              disabled={disableShortcuts}
              onClick={Recorde}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">R</Kbd> <Text m="0 10px">{t("RECORD")}</Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center">
            <Button
              disabled={disableShortcuts}
              onClick={Stop}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">W</Kbd>{" "}
              <Text m="0 10px"> {t("STOP_RECORDING")} </Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center">
            <Button
              disabled={disableShortcuts}
              onClick={fetcher}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">F</Kbd> <Text m="0 10px">{t("Fetch")} </Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center">
            <Button
              disabled={disableShortcuts}
              colorScheme="teal"
              w="100%"
              size="lg"
              onClick={resetRecorded}
            >
              <Kbd color="#000">Q</Kbd> <Text m="0 10px"> {t("RESET")} </Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center">
            <Button
              disabled={disableShortcuts}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">S</Kbd> <Text m="0 10px"> {t("SUBMIT")} </Text>
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );

  function Recorde() {
    if (isRecordeing) {
      toast({
        title: t("ALREADY_RECORDING"),
        status: "error",
        isClosable: true,
      });
      return false;
    }
    toast({
      title: "",
      description: t("RECORD"),
      status: "info",
    });
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
            if (track.readyState === "live") {
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
      toast({
        title: "Error",
        description: t("NOT_RECORDING_YET"),
        status: "error",
      });
      return false;
    } else {
      mediaStream.current.stop();
      toast({
        title: "Message",
        description: t("STOP_RECORDING"),
        status: "success",
      });
    }
  }

  function Play() {
    if (chunks.length < 1) {
      return toast({
        status: "error",
        isClosable: true,
        title: "Error",
        description: t("NO_THING"),
      });
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
    const word = {
      ar: "أنا",
      en: "I",
      file_name: "64cdd16c-dc84-4695-8095-2f33c1734637.web",
      sound_id: "7a16995e-b721-4fb5-ab3e-14ec479923fe",
      word_id: "1379fef1-34eb-47e4-88d9-c5ac519afcce",
    };
    return new Promise((res, rej) => {
      setTimeout(() => {
        ToogleLoading("show");
        setTimeout(() => {
          ToogleLoadingSuccess("show");
          setData([word]);
        }, 500);
      }, 500);
    });
  }

  function Submit() {
    if (chunks.length < 1 || !data) {
      return toast({
        title: t("NO_THING"),
        isClosable: true,
        status: "error",
        containerStyle: {
          direction: "initial",
        },
      });
    }

    ToogleIsSubmitting("show");

    setTimeout(() => {
      ToogleLoading("show");
      setTimeout(() => {
        fetcher();
      }, 500);
    }, 500);
  }

  function resetRecorded() {
    FreeChunks();
    console.log(chunks);
    mediaStream.current = null;

    toast({
      title: "Reset",
      status: "success",
      isClosable: true,
    });
  }
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../../utils/redirect";
import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  Grid,
  GridItem,
  Heading,
  Kbd,
  keyframes,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

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
