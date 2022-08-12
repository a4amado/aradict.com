import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../../resources/abadis.svg";
import { useTranslation } from "react-i18next";
import { deleteCookie, removeCookies } from "cookies-next";
import DrawerC from "../Drawer";
import { Box } from "@chakra-ui/react";
import Locales from "../Locales";

const Header = ({ userType }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [activeMenu, SetActiveMEnu] = useState(false);

  React.useEffect(() => {
    SetActiveMEnu(false);
  }, [router]);

  const Classes = {
    header: styles.header,
    list: `${styles.list} ${activeMenu && styles.active_MOB_MEN}`,
    topBar: styles.topBar,
    logo: styles.logo,
    headerWrapper: styles.headerWrapper,
    mob_btn: styles.mob_btn,
  };
  return (
    <Box
      height={65}
      display="flex"
      width="100%"
      backgroundColor="#fff"
      justifyContent="space-evenly"
      p='10px 5px'
      _fullScreen={true}
    >
      <Locales />
      <Link href="/">
        <Image src={Logo} width={150} height={40} alt="dd" />
      </Link>

      <DrawerC>
        <HeaderList userType={userType} />
      </DrawerC>
    </Box>
  );
};

export default Header;

function HomeBtn() {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  // Only show this btn if pathname was not "/"
  if (pathname === "/") return false;
  return (
    <Link href="/">
      <a>{t("HOME")}</a>
    </Link>
  );
}

function HeaderList({ userType }) {
  const { t } = useTranslation("common");
  // if usernot auth show login btn
  if (!userType) {
    return <LoginBtn />;
  }

  if (userType === "admin") {
    return (
      <>
        <Link href="/sound-reviewer">
          <a>{t("REVIEW_SOUND")}</a>
        </Link>
        <Link href="/sound-contributer">
          <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
        </Link>
      </>
    );
  }

  if (userType === "sound-contributer") {
    return (
      <Link href="/sound-contributer">
        <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
      </Link>
    );
  }

  if (userType === "sound-reviewer") {
    return (
      <>
        <Link href="/sound-reviewer">
          <a>{t("REVIEW_SOUND")}</a>
        </Link>
        <Link href="/sound-contributer">
          <a>{t("CONTRIBUTE_WITH_YOUR_VOICE")}</a>
        </Link>
      </>
    );
  }
  return false;
}

function LoginBtn() {
  const { t } = useTranslation();
  return (
    <Link href="/login">
      <a>{t("LOGIN")}</a>
    </Link>
  );
}

function Logout() {
  const router = useRouter();

  const { t } = useTranslation();
  return (
    <Link href={`/api/logout`}>
      <a>{t("LOGOUT")}</a>
    </Link>
  );
}
