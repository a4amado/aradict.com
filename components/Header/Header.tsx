import Image from 'next/image';
import NextLink, { LinkProps } from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import * as Chakra from '@chakra-ui/react';

import Logo from '../../public/abadis.svg';
import AuthLayers from '../../utils/AuthLayers';
import { usePageProps } from '../../utils/PagePropsInComponents';
import DrawerC from '../Drawer';
import Locales from '../Locales';

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
  href: "/api/auth/signout",
  text: "LOGOUT",
  passHref: true,
  disable: {
    pathMatch: true,
  },
};

const AdminMenu: MenuObject = {
  user: "admin",
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
  user:"soundContributer",
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
  user: "soundReviwer",
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
