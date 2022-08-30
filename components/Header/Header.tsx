import Image from "next/image";
import NextLink, { LinkProps } from "next/link";
import Router from "next/router";
import { useTranslation } from "react-i18next";
import * as Chakra from "@chakra-ui/react";
import Locales from "../Locales";
import { usePageProps } from "../../utils/PagePropsInComponents";
import Logo from "../../public/abadis.svg";
import DrawerC from "../Drawer";
import React from "react";
import AuthLayers from "../../utils/AuthLayers";


const Header = () => {
  return (
    <Chakra.Box
      height={65}
      display="flex"
      width="100%"
      backgroundColor="#fff"
      justifyContent="space-evenly"
      p="10px 5px"
    >
      <Locales />
      <NextLink href="/" passHref={true}>
        <Chakra.Link>
          <Image
            src={Logo}
            loading="lazy"
            placeholder="blur"
            title="Logo"
            blurDataURL="ssssssssssssssssss"
            width={150}
            height={40}
            alt="dd"
          />
        </Chakra.Link>
      </NextLink>

      <DrawerC>
        <Chakra.Stack>
          <HeaderList />
        </Chakra.Stack>
      </DrawerC>
    </Chakra.Box>
  );
};

export default React.memo(Header);

function HeaderList() {
  const { list } = useMenuList();
  
  return (
    <React.Fragment>
      {list.map((item) => (
        <MenuBtn text={item.text} options={item} key={item.text} />
      ))}
    </React.Fragment>
  );
}

const usePathMatch = (path: any) => {
  return Router.pathname === path;
};

const MenuBtn = ({ text, options }: { text: string; options: MenuList }) => {
  const PathMatch = usePathMatch(options.href);
  const { t } = useTranslation();
  const Btn = (style: any) => (
    <NextLink {...options}>
      <Chakra.Link as={Chakra.Button} {...style}>
        <a>{t(text)}</a>
      </Chakra.Link>
    </NextLink>
  );

  if (options.disable.pathMatch && PathMatch) {
    return <Btn display="none" />;
  }
  return <Btn />;
};

interface MenuObject {
  user: string;
  list: Array<MenuList>;
}

interface MenuList extends LinkProps {
  text: string;
  disable?: {
    pathMatch?: boolean;
  };
}



const LOGOUT_BTN = {
  href: "/api/logout",
  text: "LOGOUT",
  passHref: true,
  disable: {
    pathMatch: true,
  },
};

const AdminMenu: MenuObject = {
  user: AuthLayers.Admin.code,
  list: [
    {
      href: "/",
      text: "HOME",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    {
      text: "REVIEW_SOUND",
      href: "/sound-reviewer",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    {
      text: "CONTRIBUTE_WITH_YOUR_VOICE",
      href: "/sound-contributer",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    LOGOUT_BTN
  ],
};

const SoundContributer: MenuObject = {
  user: AuthLayers.VC.code,
  list: [
    {
      href: "/",
      text: "HOME",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    {
      text: "CONTRIBUTE_WITH_YOUR_VOICE",
      href: "/sound-contributer",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    LOGOUT_BTN
  ],
};

const SoundReviwer: MenuObject = {
  user: AuthLayers.VR.code,
  list: [
    {
      href: "/",
      text: "HOME",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    {
      text: "REVIEW_SOUND",
      href: "/sound-reviewer",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
  ],
};

const UnAuth: MenuObject = {
  user: null,
  list: [
    {
      href: "/",
      text: "HOME",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    },
    {
      text: "LOGIN",
      href: "/login",
      passHref: true,
      disable: {
        pathMatch: true,
      },
    }
  ],
};

const Menus = [AdminMenu, SoundContributer, SoundReviwer];

const useMenuList = (): MenuObject => {
  const { userType } = usePageProps();
  if (!userType) return UnAuth;
  const btns  = Menus.find((menu) => menu.user === userType)
  
  return btns;
};
