/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import React, { Dispatch, useCallback, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useTranslation } from "next-i18next";



import isArabic from "../utils/isArabic";
// import NextLink from "next/link";
import {
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  InputGroup,
  InputLeftAddon,
  Button,
  Tag,
  Text,
  useToast,
  Box,
  Spinner,
  Input,
  useBoolean,
  Portal,
  Image,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { css } from "@emotion/react";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Header />
      <Head>
        <title>Aradict.com | أرادكت</title>
      </Head>
      <Container maxW={1140} width="100%" m="0 auto">
        <Container h="100vh" maxW={800}>
          <Center height="30%" maxW="800px" width="100%" textAlign="center">
            <Image alt="s" src="/abadis.svg" width={400} height={150} />
          </Center>
          <AutoComplete />
        </Container>

        <Container width="100%" maxW="100%" bg="white" p="20px">
          <Tag variant="solid" colorScheme="teal" size="lg">
            {t("WHAT_IS_ARADICT")}
          </Tag>
          <Text>{t("TO_USE_ARADICT")}</Text>

          <br />
          <img
            alt="s"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%!important",
              height: "auto!important",
              maxWidth: "500px!important",
            }}
            src="/Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}
          <br />
          <img
            alt="s"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%!important",
              height: "auto!important",
              maxWidth: "500px!important",
            }}
            src="/Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}
          {t("LOREM_IPSUM")}
          <br />
          <img
            alt="ddddddd"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%!important",
              height: "auto!important",
              maxWidth: "500px!important",
            }}
            src="/Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}

          <Grid
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={10}
            maxWidth={1140}
            width="100%"
            margin="10px auto"
          >
            <GridItem position="relative">
              <img src="/prodandroid.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="/prodchrome.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="/prodfirefox.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="/prodtelegram.jpg" alt="dd" />
            </GridItem>
          </Grid>

          <Heading as="h2">قاموس أرادكت</Heading>
          <Text>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا
            كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد
            الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص
            العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير
            من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على
            المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور
            مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة
            له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. هذا النص يمكن
            أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير
            منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
          </Text>
        </Container>
      </Container>
      <Footer />
    </>
  );

  function Submit() {}
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { jwtVerify } from "../utils/jwt";

const getServerSideProps: GetServerSideProps = async ({ req, locale, res }) => {

  

  const TOKEN = req.cookies?.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  let data: any;
  try {
    data = await jwtVerify(TOKEN, JWT_SECRET);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);

  return { props: { userType, ...translation } };
};

export { getServerSideProps };

const ListStyle = css`
  & > button {
    border: 1px solid #000;
    display: block;
    width: 100%;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

import { Circular, Node } from "doublie";
import ConShow from "../components/Show";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { noSSR } from "next/dynamic";

const AutoComplete = () => {
  const toast = useToast();
  const [show, { on, off }] = useBoolean();
  const [q, setQ] = React.useState("");
  const router = useRouter();

  const onChange = (e) => {
    const key = e.key;
    if (key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
    const Coee = isArabic.validate({ word: e.target.value });
    if (!Coee)
      return toast({
        title: t("ONLY_AR_LETTERS"),
        status: "error",
        isClosable: true,
      });
    setQ(e.target.value);
    search(e.target.value);
  };
  const inputRefContainer = React.useRef<HTMLDivElement>();
  const [searching, setSearching] = useState<boolean>();
  const [items, setItems] = useState<Circular>();
  
  const [activeItem, setActiveItem] = useStateDep(items?.head, [items]);
  const { t } = useTranslation("common");

  function search(e) {
    setItems(null);
    setSearching(true);
    setTimeout(() => {
      const circular = new Circular();
      Array.from({ length: 10 }, () => ({ id: Math.random() * 10 })).map((e) =>
        circular.append(e)
      );
      setItems(circular);
      setSearching(false);
    }, 2000);
  }

  function SwitchNode(e) {
    const key = e.key;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items) return false;
      if (key === "ArrowDown") return setActiveItem(activeItem.next);
      if (key === "ArrowUp") return setActiveItem(activeItem.prev);
    }
    if (key === "Enter") return router.push({ pathname: "/word", query: { q: "wwwww" } });
    return true;
  };

  return (
    <>
      <Portal>
        <ConShow condetion={show}>
          <Box
            onClick={off}
            position="absolute"
            top={0}
            left={0}
            h="100%"
            width="100%"
            bg="blackAlpha.400"
            zIndex={1}
          />
        </ConShow>
      </Portal>
      <Box
        position="relative"
        height="auto"
        maxW={700}
        w="100%"
        margin="0 auto"
        zIndex={2}
      >
        <InputGroup
          ref={inputRefContainer}
          height={65}
          position="unset"
          borderRadius={0}
          maxW="700px"
          overflow="hidden"
        >
          <Input
            dir="rtl"
            bg="white"
            pr="4.5rem"
            textAlign="center"
            height="100%"
            w="100%"
            borderRadius={0}
            onChange={onChange}
            onKeyDown={SwitchNode}
            onFocus={on}
            value={q}
          />
          <InputLeftAddon borderRadius={0} height="100%">
            {t("SEARCH")}
          </InputLeftAddon>

          <Box
            bg="white"
            position="absolute"
            top="100%"
            width="100%"
            left={0}
            // gap={1}
          >
            <ConShow condetion={!!items && !searching && !!q && show}>
              <ListOfSuggestions items={items} activeItem={activeItem} />
            </ConShow>

            <ConShow condetion={searching && !!q}>
              <Center height={200}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Center>
            </ConShow>

            <ConShow condetion={!items && !searching && !!q}>
              <Center height={400}>Nothing Found</Center>
            </ConShow>
          </Box>
        </InputGroup>
      </Box>
    </>
  );
};

const ListOfSuggestions = ({ items, activeItem }) => {
  return (
    <Box css={ListStyle}>
      {items.toArray().map((e, i) => {
        const active = activeItem?.value?.id === e.id;
        return (
          <NextLink key={i} href={`/word?q=word`} passHref shallow>
            <Link
              as={Button}
              key={e.id}
              tabIndex={active ? 0 : -1}
              bg={active ? "yellow" : "ref"}
            >
              Word - {i}
            </Link>
          </NextLink>
        );
      })}
    </Box>
  );
};



const useStateDep = (state: any,  dep: any[]): [any, Dispatch<Node>] => {
  const [value, setValue] = useState<Node>();

  React.useEffect(() => {
    setValue(state)
  }, [...dep])
  return [value, setValue]
}

