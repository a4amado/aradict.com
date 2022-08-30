import * as Chakra from "@chakra-ui/react";

import {
  motion,
  useAnimationControls,
  Variants,
  AnimationControls,
} from "framer-motion";
import Router from "next/router";
import React, { memo } from "react";
import { useFirstMountState } from "react-use";

const variants: Variants = {
  active: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    zIndex: 500000,
    backgroundColor: "white",
    display: "block",
    opacity: 1,
  },
  hide: {
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },

    opacity: 0,
  },
  out: {
    display: "none",
  },
};

const Loading = () => {
  const isFirstMount = useFirstMountState();
  const controle: AnimationControls = useAnimationControls();

  const H = () => controle.start("hide").then(() => controle.start("out"));

  React.useEffect(() => {
    if (isFirstMount && Router.ready) H();
  }, []);

  Router.events.on("routeChangeStart", () => controle.start("active"));
  Router.events.on("routeChangeComplete", H);

  return (
    <>
      <Chakra.Box
        as={motion.div}
        variants={variants}
        animate={controle}
        initial="active"
      >
        <Chakra.Box
          display="flex"
          w="100vw"
          h="100vh"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <img alt="s" src="/abadis.svg" width={400} height={150} />
          <Chakra.Spinner size="lg" m={10} />
        </Chakra.Box>
        <Chakra.Spinner />
      </Chakra.Box>
    </>
  );
};

export default memo(Loading);
