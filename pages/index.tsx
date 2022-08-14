import { verify } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Logo from "../resources/abadis.svg";
import { useRouter } from "next/router";
import { i18n, useTranslation } from "next-i18next";
import isArabic from "../utils/isArabic";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Square,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const BounseKeyFrames = keyframes`
  0% {
    transform: translatey(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
`;
const BounseCss = css`
  animation: ${BounseKeyFrames} 1s ease infinite;
`;

function Home({ userType }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [q, setQ] = React.useState("");
  const toast = useToast();

  const search = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    search.current.focus();
  }, []);

  return (
    <>
      <Header userType={userType} />

      <Head>
        <title>Aradict.com | أرادكت</title>
      </Head>

      <Container maxW={1140} width="100%">
        <Container h="100vh" maxW={800}>
          <Center
            height="60%"
            maxW="800px"
            width="100%"
            textAlign="center"
            flexDirection="column"
          >
            <Image alt="s" src={Logo} width={400} height={150} />
            <InputGroup height={65} width="100%" mt={10} dir="rtl">
              <Input
                
                value={q || ""}
                ref={search}
                dir="rtl"
                onChange={(e) => {
                  const lastCharachter =
                    e.target.value[e.target.value.length - 1] || "";
                  let isLetterArabic = isArabic.validate({
                    word: lastCharachter,
                  });

                  if (!isLetterArabic && !lastCharachter.match(/\s/)) {
                    toast({
                      duration: 2000,
                      status: "error",
                      position: "top",
                      isClosable: true,
                    });

                    setQ(q);
                  } else {
                    setQ(e.target.value);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    Submit();
                  }
                }}
                type="search"
                bg="white"
                pr="4.5rem"
                textAlign="center"
                height="100%"
                w="100%"
                
              />
              <InputLeftAddon height="100%">{t("SEARCH")}</InputLeftAddon>
              
            </InputGroup>
          </Center>
          <Center>
            <Square css={BounseCss} bg="white" size="40px">
              <ArrowDownIcon fontSize={20} />
            </Square>
          </Center>
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
              width: "100%",
              height: "auto",
              maxWidth: "500px",
            }}
            src="Dictionary.jpg"
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
              width: "100%",
              height: "auto",
              maxWidth: "500px",
            }}
            src="Dictionary.jpg"
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
              width: "100%",
              maxWidth: "500px",
              height: "auto",
            }}
            src="Dictionary.jpg"
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
            <GridItem>
              <img src="prodandroid.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodchrome.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodfirefox.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodtelegram.jpg" alt="dd" />
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

export default Home;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ req, locale }) {
  const TOKEN = req.cookies?.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  let data = verify(TOKEN, JWT_SECRET, (err, data) => (!err ? data : false));
  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return { props: { userType, ...translation } };
}
