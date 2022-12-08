import NextLink from 'next/link';
import React from 'react';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import * as Chakra from '@chakra-ui/react';

const Footer = () => {
  return (
    <Chakra.Center mt={10} bg="white" width="100%" height={65} flex={0}>
      <Chakra.Text display="block" dir="ltr">
        Made By
        <NextLink href="https://www.3adl.dev" dir="ltr" passHref>
          <Chakra.Link isExternal={true}> Ahmmad Addel </Chakra.Link>
        </NextLink>
        <ExternalLinkIcon />
      </Chakra.Text>
    </Chakra.Center>
  );
};

export default React.memo(Footer);
