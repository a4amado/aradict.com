import Router from 'next/router';
import React, { memo } from 'react';
import Image from "next/image";

import * as Chakra from '@chakra-ui/react';
import{ useSession } from 'next-auth/react';
import * as  luxon from "luxon";



import ShowC from "../Show";

function Drawer({ children }) {
  
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  Router.events.on("routeChangeStart", onClose);
  const btnRef = React.useRef();
  const session = useSession();
  
  
  

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
                  <>Side Menu {session.data?.role}</>

                </Chakra.Text>

                
                </Chakra.Center>
                
            </Chakra.DrawerHeader>
            
            <Chakra.DrawerBody>
            <ShowC condetion={session.status === "authenticated"}>
                  
                  <Chakra.Box display="flex" dir="ltr" my="10px">
                  
                  <Chakra.Box mx='10px'>
                    <Image src={session?.data?.user?.image} width={60} height={60}/>
                  </Chakra.Box>
                  <Chakra.Box>
                    <Chakra.Text fontSize="xs">
                    {session?.data?.user?.name}
                    </Chakra.Text>
                    <Chakra.Text fontSize="xs">
                    {session?.data?.user?.email}
                    </Chakra.Text>
                    

                  </Chakra.Box>
                  
                  </Chakra.Box>
                  
                  </ShowC>
                  {children}
                  <SessionDuration end={session?.data?.expires}/>
              </Chakra.DrawerBody>
          </Chakra.DrawerContent>
        </Chakra.Drawer>
      </Chakra.Portal>
    </>
  );
}

export default memo(Drawer);


const SessionDuration = ({ end }: any ) => {
  let [date2, setDate2] = React.useState(luxon.DateTime.fromISO(end));
  
  React.useEffect(() => {
    const gg = setInterval(() => {
      setDate2(luxon.DateTime.fromISO(end))
    }, 1000)
    return () => clearInterval(gg)
  }, [])
  
  if (!end) return <></>;
  

  const diff = date2.diffNow(["days", "hours", "minutes", "second"]).toHuman({
    listStyle: "short",
    maximumFractionDigits: 0
  });

  
  return <Chakra.Text fontSize="xs" dir="ltr">
    Sisson ends in
    <br/>
    {diff}
</Chakra.Text>
}