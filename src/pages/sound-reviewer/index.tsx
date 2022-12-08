import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

import * as Chakra from '@chakra-ui/react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ConShow from '../../components/Show';
import useAxios from '../../hooks/useAxios';
import isAuth from '../../utils/isAuthrized';
import Redirect from '../../utils/redirect';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const translation = await serverSideTranslations(ctx.locale || "ar", ["common"]);

  let user: any = await isAuth(ctx);
  if (!user || user.rank > 1) return Redirect("/", 1);



  return {
    props: {
      ...translation
    },
  };
};

const VoiceReviewer = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const f_request = useAxios();
  const toast = Chakra.useToast();

  let soundRef = React.useRef(null);

  React.useEffect(() => {
    fetcher();
  }, []);

  const router = useRouter();
  const { t } = useTranslation();

  async function fetcher() {
    return new Promise((res, rej) => {
      const Sound = {
        ar: "أنا",
        en: "I",
        file_name: "fb3da276-6b3f-4f2b-a467-fc363675a490.mp3",
        sound_id: "7a16995e-b721-4fb5-ab3e-14ec479923fe",
        word_id: "1379fef1-34eb-47e4-88d9-c5ac519afcce",
      };

      return setTimeout(() => {
        res(Sound);
      }, 3000);
    });
  }

  React.useEffect(() => {
    fetcher();
  }, []);

  const sound = React.useRef(null);

  function play() {
    if (!f_request.data) return false;
    soundRef.current.play();
  }

  function pause() {
    if (!f_request.data) return false;
    soundRef.current.pause();
  };

  useHotkeys("W", () => {
    pause();

  });

  useHotkeys(
    "P",
    () => {
      play();

    },
    [isLoading]
  );
  useHotkeys("A", () => {
    approve();

  });

  useHotkeys("R", () => {
    reject();
  });

  return (
    <>
      <Header />
      <Head>
        <title>{ }</title>
      </Head>
      <Chakra.Box display="flex" flexDir="column" flex={1}>
        <Chakra.Center
          w="100%"
          m="10px auto"
          overflow="hidden"
          position="relative"
          maxW={600}
          height={200}
        >
          {
            !f_request.data && <Chakra.Center
              w="100%"
              h="100%"
              position="absolute"
              top={0}
              left={0}
              backgroundColor="white"
            >
              <Chakra.Spinner />
            </Chakra.Center>
          }


          {!!f_request.data && <Chakra.Center
            display="flex"
            flexDir="column"
            fontSize={20}
            height="100%"
            w="100%"
            h={200}
            bg="#fff"
          >
            <Chakra.Kbd m={3} p={3} display="block" size="xl">
              {f_request.data.ar}
            </Chakra.Kbd>
            <audio
              ref={soundRef}
              controls
              src={`/sound/${f_request.data?.file_name}`}
            />
          </Chakra.Center>}


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
                disabled={!f_request.data}
                onClick={reject}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Chakra.Kbd color="#000">P</Chakra.Kbd>
                <Chakra.Text m="0 10px">{t("PLAY")}</Chakra.Text>
              </Chakra.Button>
            </Chakra.GridItem>
            <Chakra.GridItem textAlign="center">
              <Chakra.Button
                disabled={!!f_request.data}
                onClick={reject}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Chakra.Kbd color="#000">R</Chakra.Kbd>
                <Chakra.Text m="0 10px">{t("REJECT")}</Chakra.Text>
              </Chakra.Button>
            </Chakra.GridItem>
            <Chakra.GridItem textAlign="center">
              <Chakra.Button
                aria-keyshortcuts="W"
                disabled={!f_request.data}
                onClick={pause}
                colorScheme="teal"
                w="100%"
                size="lg"
              >
                <Chakra.Kbd color="#000">\W\</Chakra.Kbd>{" "}
                <Chakra.Text m="0 10px"> Pause </Chakra.Text>
              </Chakra.Button>
            </Chakra.GridItem>
            <Chakra.GridItem textAlign="center">
              <Chakra.Button

                onClick={fetcher}
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
                disabled={!!f_request.data}
                colorScheme="teal"
                w="100%"
                size="lg"
                onClick={approve}
              >
                <Chakra.Kbd color="#000">A</Chakra.Kbd>
                <Chakra.Text m="0 10px"> {t("APPROVE")} </Chakra.Text>
              </Chakra.Button>
            </Chakra.GridItem>
          </Chakra.Grid>
        </Chakra.Box>
      </Chakra.Box>
      <Footer />
    </>
  );

  async function approve() {
    const ff = new Promise((res, rej) => {
      setTimeout(() => {
        res("HI");
      }, 5000);
    });

    toast.promise(ff, {
      loading: {
        title: "loading",
      },
      error: {
        title: "error",
      },
      success: {
        title: "Success",
      },
    });
    // setTimeout(function () {

    //   // setTimeout(function () {
    //   //   // fetcher();
    //   // }, 500);
    // }, 500);
  }

  async function reject() {
    if (!f_request.data) return false;

    setIsLoading(true);
    try {
      setTimeout(() => {
        setTimeout(() => {
          fetcher();
        }, 500);
      }, 500);
    } catch (error) {
      setTimeout(() => {
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
