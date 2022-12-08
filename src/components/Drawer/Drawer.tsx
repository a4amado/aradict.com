import Router from 'next/router';
import React, { memo } from 'react';
import Image from "next/image";

import * as Chakra from '@chakra-ui/react';
import{ useSession } from 'next-auth/react';




import ShowC from "../Show";
import { Button, typography } from '@chakra-ui/react';

function Drawer({ children }) {
  
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  Router.events.on("routeChangeStart", onClose);
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
              <Chakra.Center>
                <Chakra.Text>
                  <>Side Menu</>

                </Chakra.Text>

                
                </Chakra.Center>
                
            </Chakra.DrawerHeader>
            <Chakra.DrawerBody>
                  
                  {children}
                  
              </Chakra.DrawerBody>
          </Chakra.DrawerContent>
        </Chakra.Drawer>
      </Chakra.Portal>
    </>
  );
}

export default memo(Drawer);
