import React, { useMemo } from "react";
import { FirstLayer } from "../../utils/AuthLayers";
import Head from "next/head";

import FormData from "form-data";
import Axios from "axios";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useHotkeys } from "react-hotkeys-hook";
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
  Toast,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { jwtVerify } from "../../utils/jwt";

import ConShow from "../../components/Show";

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

import swr from "swr";
import useRecorder from "../../hooks/useRecorder";

export default function AddSound() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [LoadingSuccess, setLoadingSuccess] = React.useState(false);
  const [LoadingFails, setLoadingFails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [SubmittingSuccess, setSubmittingSuccess] = React.useState(false);
  const [SubmittingFails, setSubmittingFails] = React.useState(false);

  const [data, setData] = React.useState<any>();
  const disableShortcuts = isLoading || isSubmitting || !data;

  const { t } = useTranslation();
  React.useEffect(() => {
    fetcher();
  }, []);

  const toast = useToast();

  const r = useRecorder({ audio: true, video: false });

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

  useHotkeys("F", () => {
    fetcher();
  });
  useHotkeys("R", () => {
    Record();
  });

  useHotkeys(
    "W",
    () => {
      Stop();
    },
    [r.isRecording]
  );
  useHotkeys(
    "S",
    () => {
      Submit();
    },
    [r.isRecording]
  );
  useHotkeys(
    "P",
    () => {
      Play();
    },
    [r.isRecording]
  );
  useHotkeys(
    "C",
    () => {
      resetRecorded();
    },
    [r.isRecording]
  );

  return (
    <>
      <Header />
      <Head>
        <title>Review Sound</title>
      </Head>

      <Center
        w="100%"
        m="10px auto"
        overflow="hidden"
        position="relative"
        maxW={600}
        h={200}
      >
        <ConShow condetion={disableShortcuts}>
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
        </ConShow>
        <ConShow condetion={!disableShortcuts}>
          <Center fontSize={20} height="100%" w="100%" h={200} bg="#fff">
            {data?.ar}
            {JSON.stringify(r.url)}
          </Center>
        </ConShow>
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
              // disabled={r.status === "no_specified_media_found"}
              onClick={Play}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">P</Kbd> <Text m="0 10px">{t("PLAY")}</Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center" position="relative">
            <ConShow condetion={r.isRecording}>
              <Circle
                position="absolute"
                top="10px"
                right="10px"
                css={indicateClass}
                bg="red"
                zIndex={2}
                size={4}
              />
            </ConShow>
            <Button
              disabled={r.isRecording}
              // onClick={Recorde}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Kbd color="#000">R</Kbd> <Text m="0 10px">{t("RECORD")}</Text>
            </Button>
          </GridItem>
          <GridItem textAlign="center">
            <Button
              disabled={r.isRecording}
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

  function Record() {
    if (r.isRecording) {
      return toast({
        title: "Error",
        description: t("ALREADY_RECORDING"),
        status: "error",
      });
    }
    r.StartRecording();
  }

  function Stop() {
    if (!r.isRecording) {
      return toast({
        title: "Error",
        description: t("NOT_RECORDING_YET"),
        status: "error",
      });
    }
    r.StopRecording();
    console.log(r.url);

    toast({
      title: "Message",
      description: t("STOP_RECORDING"),
      status: "success",
    });
  }

  function Play() {
    // if (r.isEmpty) return toast({ status: "error", isClosable: true, title: "Error", description: t("NO_THING") });
    console.log(r.chunks);

    // const aa = new Audio();
    // aa.play()
  }

  async function fetcher() {
    ToogleLoading("show");
    setData(null);
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
          setData(word);
        }, 500);
      }, 500);
    });
  }

  function Submit() {
    // if (!r.state.isEmpty)
    //   return toast({
    //     title: t("NO_THING"),
    //     isClosable: true,
    //     status: "error",
    //     containerStyle: { direction: "initial" },
    //   });
    ToogleIsSubmitting("show");

    setTimeout(() => {
      ToogleLoading("show");
      setTimeout(() => {
        fetcher();
      }, 500);
    }, 500);
  }

  function resetRecorded() {
    // r.clearBlobUrl();
    toast({ title: "Reset", status: "success", isClosable: true });
  }
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../../utils/redirect";
import { string } from "yup";
export const getServerSideProps = async ({ req, locale }) => {
  const TOKEN = req.cookies.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;

  let data;
  try {
    data = await jwtVerify(TOKEN, JWT_SECRET);
  } catch (error) {
    return Redirect("/", false);
  }
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
