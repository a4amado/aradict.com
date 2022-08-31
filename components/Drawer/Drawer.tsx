import Router from 'next/router';
import React, { memo } from 'react';

import * as Chakra from '@chakra-ui/react';

import { usePageProps } from '../../utils/PagePropsInComponents';

function Drawer({ children }) {
  
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  Router.events.on("routeChangeStart", onClose);
  const { userType } = usePageProps();
  const btnRef = React.useRef();
  
  
  

  return (
    <>
      <Chakra.Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Menu
      </Chakra.Button>
      <Chakra.Portal>
        <Chakra.Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          blockScrollOnMount={true}
        >
          <Chakra.DrawerOverlay />
          <Chakra.DrawerContent>
            <Chakra.DrawerCloseButton />
            <Chakra.DrawerHeader>
              <Chakra.Center>Side Menu {userType} </Chakra.Center>
            </Chakra.DrawerHeader>
            <Chakra.DrawerBody>{children}</Chakra.DrawerBody>
          </Chakra.DrawerContent>
        </Chakra.Drawer>
      </Chakra.Portal>
    </>
  );
}

export default memo(Drawer);
