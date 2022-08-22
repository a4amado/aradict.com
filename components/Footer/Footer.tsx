import { Box, Center, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    
      <Center mt={10} bg="white" width="100%" height={65} flex={0}>
        <Text display="block">
          Made By
          <Link isExternal={true} href="https://github.com/a4addel">
            Ahmmad Addel
          </Link>
        </Text>
      </Center>
    
  );
};

export default Footer;
