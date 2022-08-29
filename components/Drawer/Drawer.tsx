import {
  Button,
  Center,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { usePageProps } from "../../utils/PagePropsInComponents";



function DrawerExample({ children }) {
  const { userType } = usePageProps()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Menu
      </Button>
      <Portal>
      <Drawer
        
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        blockScrollOnMount={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>Side Menu {userType} </Center>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
      </Portal>
    </>
  );
}

export default memo(DrawerExample)
