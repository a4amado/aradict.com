import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Logo from "../../resources/abadis.svg";
import { useTranslation } from "react-i18next";

import DrawerC from "../Drawer";
import { Box, Button,Link, Stack } from "@chakra-ui/react";

import Locales from "../Locales";
import { usePageProps } from "../../utils/PagePropsInComponents";


const Header = () => {

  return (
    <Box
      height={65}
      display="flex"
      width="100%"
      backgroundColor="#fff"
      justifyContent="space-evenly"
      p="10px 5px"
    >
      <Locales />
      <NextLink href="/"  passHref={true}>
        <Link>
        
        <Image src={Logo} width={150} height={40} alt="dd" />
        </Link>
      </NextLink>

      <DrawerC>
        <Stack>
          <HomeBtn />
          <HeaderList />
        </Stack>
      </DrawerC>
    </Box>
  );
};

export default Header;

function HomeBtn() {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  // Only show this btn if pathname was not "/"
  if (pathname != "/")
    return (
      <NextLink href="/" passHref>
        <Link as={Button}>
          <a>{t("HOME")}</a>
        </Link>
      </NextLink>
  );
}

function HeaderList() {
  const {userType} = usePageProps()
  const { t } = useTranslation("common");
  // if usernot auth show login btn
  if (!userType) {
    return <LoginBtn />;
  }

  if (userType === "admin") {
    return (
      <>
        <NextLink href="/sound-reviewer" passHref>
          <Link as={Button}>
            <a>{t("REVIEW_SOUND")}</a>
          </Link>
        </NextLink>
        <NextLink href="/sound-contributer" passHref>
          <Link as={Button}>
            <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
          </Link>
        </NextLink>
      </>
    );
  }

  if (userType === "sound-contributer") {
    return (
      <NextLink href="/sound-contributer" passHref>
        <Link as={Button}>
          <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
        </Link>
      </NextLink>
    );
  }

  if (userType === "sound-reviewer") {
    return (
      <>
        <NextLink href="/sound-reviewer" passHref>
          <Link as={Button}>
            <a>{t("REVIEW_SOUND")}</a>
          </Link>
        </NextLink>
        <NextLink href="/sound-contributer" passHref>
          <Link as={Button}>
            <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
          </Link>
        </NextLink>
      </>
    );
  }
}

function LoginBtn() {
  const {userType} = usePageProps()
  
  const { t } = useTranslation();

  if (userType) return <></>;

  return (
    <NextLink href="/login" passHref shallow={true}>
      <Link as={Button}>
        <a>{t("LOGIN")}</a>
      </Link>
    </NextLink>
  );
}

function Logout() {
  const {userType} = usePageProps()
  
  const { t } = useTranslation();

  if (userType) return <></>
  return (
    <NextLink href="/api/logout" passHref>
      <Link as={Button}>
        <a>{t("LOGOUT")}</a>
      </Link>
    </NextLink>
  );
}
