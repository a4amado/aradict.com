import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { MouseEventHandler } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import * as Chakra from '@chakra-ui/react';

import Header from '../../components/Header';
import ConShow from '../../components/Show';
import useAxios from '../../hooks/useAxios';
import useRecorder from '../../hooks/useRecorder';
import isAuth from '../../utils/isAuthrized';
import Redirect from '../../utils/redirect';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const translation = await serverSideTranslations(ctx.locale, ["common"]);
  let user: any = await isAuth(ctx);
  if (!user || user.rank > 2) return Redirect("/", true);
  const userType = user?.role || "";
  

  return {
    props: {
      ...translation,
      userType,
    },
  };
};

export default function AddSound() {
  React.useEffect(() => {
    fetch();
  }, []);

  const toast = Chakra.useToast();
  const { t } = useTranslation();

  const f_request = useAxios(); // handle Fetching
  const s_request = useAxios(); // Handle submitting
  const r = useRecorder({ audio: true, video: false });

  useHotkeys("F", () => {
    fetch();
  });
  useHotkeys(
    "R",
    () => {
      record();
    },
    [r.isRecording]
  );

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
        <ConShow condetion={!f_request.data}>
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
        <ConShow condetion={!!f_request.data}>
          <Chakra.Center fontSize={20} height="100%" w="100%" h={200} bg="#fff">
            <React.Fragment>
            <ConShow condetion={r.isRecording}>
              <motion.div
                animate={{
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  yoyo: Infinity,
                }}
              >
                <Chakra.Circle
                  position="absolute"
                  top="10px"
                  right="10px"
                  bg="red"
                  zIndex={2}
                  size={4}
                />
              </motion.div>
            </ConShow>
            {f_request.data?.ar}
            </React.Fragment>
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
          <C_Button SC="P" disabled={r.isEmpty} action={play}>
            PLAY
          </C_Button>
          <C_Button SC="R" disabled={r.isRecording} action={record}>
            RECORD
          </C_Button>
          <C_Button SC="W" disabled={!r.isRecording} action={stop}>
            STOP_RECORDING
          </C_Button>
          <C_Button SC="F" disabled={r.isEmpty} action={fetch}>
            Fetch
          </C_Button>
          <C_Button SC="Q" disabled={r.isEmpty} action={resetRecorded}>
            RESET
          </C_Button>
          <C_Button SC="S" disabled={r.isEmpty} action={console.log}>
            SUBMIT
          </C_Button>
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
        id: "1",
      });
    }
    r.StopRecording();

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
      method: "GET",
    });
  }

  function submit() {
    if (s_request.isLoading || f_request.isLoading || r.isEmpty) {
      return toast({
        title: t("NO_THING"),
        isClosable: true,
        status: "error",
        containerStyle: { direction: "initial" },
      });
    }

    // toast(s_request.call({

    // }))
  }

  function resetRecorded() {
    r.reset();
    toast({ title: "Reset", status: "success", isClosable: true });
  }
}

{
  /* <Chakra.GridItem textAlign="center">
            <Chakra.Button
              disabled={r.isEmpty}
              colorScheme="teal"
              w="100%"
              size="lg"
            >
              <Chakra.Kbd color="#000">S</Chakra.Kbd>{" "}
              <Chakra.Text m="0 10px"> {t("SUBMIT")} </Chakra.Text>
            </Chakra.Button>
          </Chakra.GridItem> */
}

interface CONTROLBTN {
  disabled: boolean;
  SC: string;
  action: MouseEventHandler;
  children: string;
}
const C_Button = (props: CONTROLBTN) => {
  const { t } = useTranslation();
  return (
    <>
      <Chakra.GridItem textAlign="center">
        <Chakra.Button
          disabled={props.disabled}
          colorScheme="teal"
          w="100%"
          size="lg"
          onClick={props.action}
        >
          <Chakra.Kbd color="#000">{props.SC}</Chakra.Kbd>
          <Chakra.Text m="0 10px"> {t(props.children)}</Chakra.Text>
        </Chakra.Button>
      </Chakra.GridItem>
    </>
  );
};
