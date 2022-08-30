const PageUserRank = layers.VC.rank;


import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import { useTranslation } from "next-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import * as Chakra from "@chakra-ui/react";
import ConShow from "../../components/Show";
import useRecorder from "../../hooks/useRecorder";



export default function AddSound() {
  React.useEffect(() => { fetch() }, []);

  const [data, setData] = React.useState<any>();  
  const toast = Chakra.useToast();
  const { t } = useTranslation();
  
  const f_request = useAxios(); // handle Fetching
  const s_request = useAxios(); // Handle submitting


  const r = useRecorder({ audio: true, video: false });
  
  

  useHotkeys("F", () => {
    fetch();
  });
  useHotkeys("R", () => {
    record();
  });

  useHotkeys(
    "W",
    () => {
      stop();
    },
    [r.isRecording]
  );
  useHotkeys(
    "S",
    () => {
      submit();
    },
    [r.isRecording]
  );
  useHotkeys(
    "P",
    () => {
      play();
    },
    [r.isRecording]
  );
  useHotkeys(
    "C",
    () => {
      resetRecorded();
    },
    [r.isRecording, r.isEmpty]
  );

  return (
    <>
      <Header />
      <Head>
        <title>Review Sound</title>
      </Head>

      <Chakra.Center
        w="100%"
        m="10px auto"
        overflow="hidden"
        position="relative"
        maxW={600}
        h={200}
      >
        <ConShow condetion={f_request.isLoading}>
          <Chakra.Center
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            backgroundColor="white"
          >
            <Chakra.Spinner />
          </Chakra.Center>
        </ConShow>
        <ConShow condetion={!f_request.isLoading || !f_request.isError || f_request.data}>
          <Chakra.Center fontSize={20} height="100%" w="100%" h={200} bg="#fff">
            {data?.ar}
            {JSON.stringify(r.url)}
          </Chakra.Center>
        </ConShow>
      </Chakra.Center>

      <Chakra.Box
        maxWidth="calc(800px + (10px * 3))"
        width="100%"
        m="10px auto"
        bg="#fff"
        borderRadius={10}
      >
        <Chakra.Center paddingTop={10}>
          <Chakra.Heading as="h5">Controllers</Chakra.Heading>
        </Chakra.Center>
        <Chakra.Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          width="100%"
          gap="10px"
          p={10}
        >
          <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={r.isEmpty}
              onClick={play}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">P</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px">{t("PLAY")}</Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
          <Chakra.GridItem textAlign="center" position="relative">
            <ConShow condetion={r.isRecording}>
              <Chakra.Circle
                position="absolute"
                top="10px"
                right="10px"
                bg="red"
                zIndex={2}
                size={4}
                as={motion.div}
              />
            </ConShow>
            <Chakra.Button
              disabled={r.isRecording}
              onClick={record}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">R</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px">{t("RECORD")}</Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
          <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={!r.isRecording}
              onClick={stop}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">W</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px"> {t("STOP_RECORDING")} </Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
          <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={!data}
              onClick={fetch}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">F</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px">{t("Fetch")} </Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
          <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={r.isEmpty}
              colorScheme="teal"
              w="100%"
              size="lg"
              onClick={resetRecorded}
            >
              <Chakra.Kbd color="#000">Q</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px"> {t("RESET")} </Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
          <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={r.isEmpty}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">S</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px"> {t("SUBMIT")} </Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem>
        </Chakra.Grid>
      </Chakra.Box>
    </>
  );

  function record() {
    if (r.isRecording) {
      return toast({
        title: "Error",
        description: t("ALREADY_RECORDING"),
        status: "error",
      });
    }
    r.StartRecording();
  }

  function stop() {
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

  function play() {
    if (r.isEmpty)
      return toast({
        status: "error",
        isClosable: true,
        title: "Error",
        description: t("NO_THING"),
      });

    const aa = new Audio(r.url);
    aa.play();
  }

  async function fetch() {
    const newWord = f_request.call({
      url: "/api/words/get-word-without-sound",
      method: "GET"
    });
  }

  function submit() {
    if (s_request.isLoading || f_request.isLoading) {
        return toast({ title: t("NO_THING"), isClosable: true, status: "error", containerStyle: { direction: "initial" }, })
    }





  }

  function resetRecorded() {
    r.reset();
    toast({ title: "Reset", status: "success", isClosable: true });
  }
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Redirect from "../../utils/redirect";
import useAxios from "../../hooks/useAxios";
import parseCookie from "../../utils/parseCookie";
import layers from "../../utils/AuthLayers";

export const getServerSideProps = async ({ req, locale }) => {
  const translation = await serverSideTranslations(locale, ["common"]);
  const user = await parseCookie(req);
  if (!user || user.rank > PageUserRank) return Redirect("/", false);

  const userType = user?.role;
  console.log(user?.role);
  
  return {
    props: {
      ...translation,
      userType,
    },
  };
};



