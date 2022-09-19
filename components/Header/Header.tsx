import Image from 'next/image';
import NextLink, { LinkProps } from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import * as Chakra from '@chakra-ui/react';

import Logo from '../../public/abadis.svg';

import DrawerC from '../Drawer';
import Locales from '../Locales';
import ShowC from "../Show"
import { useSession } from 'next-auth/react';

const Header = () => {
  const session = useSession()
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
        {
          session.status === "loading" && 
          <Chakra.Container display="flex" justifyContent="stretch">
            <Chakra.Center w="100%" flex={1}>
          <Chakra.Spinner />
        </Chakra.Center>
        </Chakra.Container>

          
        }
        
        <Chakra.Stack>
        {
         session.status === "authenticated"  && <HeaderList />
          
        }
         {
          session.status === "unauthenticated" && <MenuBtn text='LOGIN' options={{
            text: "LOGIN",
            href: "/login"
          }} />
         }
        
        
          
        </Chakra.Stack>
        
      </DrawerC>
    </Chakra.Box>
  );
};

export default React.memo(Header);



            
              
function HeaderList() {
  const list = useMenuList();
  const session = useSession();          
  return (
    <Chakra.Box display="flex" justifyContent="stretch" flexDir="column" gap="10px">
      <ShowC condetion={session.status === "authenticated"}>
        <NextLink passHref={true} href={`/user?q=${session.data?.id}`}>
                <Chakra.Link as={Chakra.Button}>
                  
                  <Image style={{
                    borderRadius: 40,
                    padding: 10
                  }} src={session?.data?.user?.image || ""} width={30} height={30} />
                  <p>{session?.data?.user?.name}</p>
                </Chakra.Link>
                </NextLink>
              </ShowC>
      {list.map((item) => (
        <MenuBtn text={item.text} options={item} key={item.text} />
      ))}
    </Chakra.Box>
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

  if (options.disable?.pathMatch && PathMatch) {
    return <Btn backgroundColor="#080" />;
  }
  return <Btn />;
};



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




const useMenuList = (): MenuList[] => {
  const user = useSession();
  console.log(user);
  
  return buttons;
};


const buttons : MenuList[] = [
  
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
  LOGOUT_BTN,
  {

    text: "REVIEW_SOUND",
    href: "/sound-reviewer",
    passHref: true,
    disable: {
      pathMatch: true,
    },
  },
]



