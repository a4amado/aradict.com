import axios from "axios";
import { useHotkeys } from "react-hotkeys-hook";

import Head from "next/head";
import React from "react";
import { SecondLayer } from "../../utils/AuthLayers";
import Header from "../../components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Redirect from "../../utils/redirect";
import {
  Box,
  Button,
  Center,
  Circle,
  Grid,
  GridItem,
  Heading,
  Kbd,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { jwtVerify } from "../../utils/jwt";
import ConShow from "../../components/Show";

const VoiceReviewer = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [LoadingSuccess, setLoadingSuccess] = React.useState(false);
  const [LoadingFails, setLoadingFails] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [SubmittingSuccess, setSubmittingSuccess] = React.useState(false);
  const [SubmittingFails, setSubmittingFails] = React.useState(false);

  const [data, setData] = React.useState([]);
  const disableShortcuts = isLoading || isSubmitting || data.length === 0;

  const toast = useToast();
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
        ToogleLoadingSuccess("show");
      }, 1000);
    });
  }
  React.useEffect(() => {
    fetcher();
  }, []);

  const sound = React.useRef(null);

  function play() {
    if (!data) return false;
    soundRef.current.play();
  }

  function pause() {
    if (!data) return false;
    soundRef.current.pause();
  }
  useHotkeys("W", () => {
    pause();
    console.log("Pause");
  });

  useHotkeys("P", () => {
    play();
    console.log("play");
  });
  useHotkeys("A", () => {
    approve();
    console.log("Approve");
  });

  useHotkeys("R", () => {
    reject();
    console.log("Approve");
  });

  
  return (
    <>
      <Header />
      <Head>
        <title>{}</title>
      </Head>
      <Box display="flex" flexDir="column" flex={1}>
        <Center
          w="100%"
          m="10px auto"
          overflow="hidden"
          position="relative"
          maxW={600}
          height={200}
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
            <Center display="flex" flexDir="column" fontSize={20} height="100%" w="100%" h={200} bg="#fff">
              <Kbd m={3} p={3} display="block" size="xl">{data[0]?.ar}</Kbd>
              <audio ref={soundRef} controls src={`/sound/${data[0]?.file_name}`} />
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
                disabled={disableShortcuts}
                onClick={reject}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Kbd color="#000">P</Kbd> <Text m="0 10px">{t("PLAY")}</Text>
              </Button>
            </GridItem>
            <GridItem textAlign="center">
              <Button
                disabled={disableShortcuts}
                onClick={reject}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Kbd color="#000">R</Kbd> <Text m="0 10px">{t("REJECT")}</Text>
              </Button>
            </GridItem>
            <GridItem textAlign="center">
              <Button
                aria-keyshortcuts="W"
                disabled={disableShortcuts}
                onClick={pause}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Kbd color="#000">\W\</Kbd>  <Text m="0 10px"> Pause </Text>
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
                onClick={approve}
              >
                <Kbd color="#000">A</Kbd>{" "}
                <Text m="0 10px"> {t("APPROVE")} </Text>
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
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
          toast({
            title: "Approves",
            status: "success",
            isClosable: true,
          });
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
        toast({
          status: "success",
          title: t("Rejected"),
          isClosable: true,
        });
        ToogleLoading("show");
        setTimeout(() => {
          fetcher();
        }, 500);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        ToogleIsSubmitting("show");
        toast({
          status: "error",
          title: t("SOMETHING_WENT_WRONG"),
          isClosable: true,
        });
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
  let data: any;

  try {
    data = await jwtVerify(TOKEN, JWT_SECRET);
  } catch (error) {
    return Redirect("/", false);
  }
  if (!data || !SecondLayer.includes(data.role)) {
    return Redirect("/", false);
  }

  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return {
    props: {
      ...translation,
      userType,
    },
  };
};

