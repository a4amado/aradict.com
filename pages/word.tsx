import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { lazy, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import { faker } from "@faker-js/faker";
faker.setLocale("ar");
import Footer from "../components/Footer";
import {
  Box,
  Center,
  Kbd,
  Text,
  Circle,
  List,
  ListItem,
  useImage,
  SkeletonCircle,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import ConShow from "../components/Show";

import Play from "../public/play.svg";
import Pause from "../public/pause.svg";

import NextImage from "next/image";

export default function AddSound({ data }) {
  const {
    query: { q },
  } = useRouter();

  return (
    <>
      <Header />

      <Box flex={1} maxW={700} w="100%" m="0 auto">
        <Center m="10px 15px" alignItems="center" justifyContent="center">
          <Text as="h1" fontWeight="bold" p="10px 15px" bg="white">
            كيفيه نظق <Kbd>المقاولون</Kbd>
          </Text>
        </Center>
        <Box w="100%" gap={2} display="grid">
          <ListC list={data} />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

import { Circular, Node } from "doublie";

const ListC = ({ list }: any) => {
  const items = useMemo(() => {
    const CirculatList = new Circular();
    list.map((e, i) => {
      CirculatList.append(e);
    });

    return CirculatList;
  }, [list]);

  const [activeItem, setActiveItem] = useState<Node>();

  function next() {
    if (items.isEmpty()) return false;
    if (!activeItem) return setActiveItem(items.head);
    setActiveItem(activeItem.next);
  }
  function prev() {
    if (items.isEmpty()) return false;
    if (!activeItem) return setActiveItem(items.last);
    setActiveItem(activeItem.prev);
  }

  function setActiveItemClick({ id }: any) {
    setActiveItem(items.node(id));
  }

  useHotkeys(
    "*",
    (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") next();
      if (event.key === "ArrowUp") prev();
    },
    [activeItem]
  );

  return (
    <ConShow condetion={!items.isEmpty()}>
      <List display="grid" gap={2}>
        {list.map((item, i) => (
          <Item
            setActiveItem={setActiveItemClick}
            item={item}
            active={activeItem}
            key={i}
            nodeIndex={i}
          />
        ))}
      </List>
    </ConShow>
  );
};

const Item = ({
  item,
  active,
  setActiveItem,
  nodeIndex,
}: {
  item: any;
  active: any;
  setActiveItem: Function;
  nodeIndex: number;
}) => {
  const isActive = item.id === active?.value?.id;
  const state = useImage({ src: item.img });

  return (
    <ListItem>
      <Box w="100%" flexDir="row" display="flex" bg={isActive ? "yellow" : "white"}>
        <Box
          flexDir="row"
          display="flex"
          p="4px 6px"
          alignItems="center"
          onClick={() => setActiveItem({ id: nodeIndex })}
          flexGrow={1}
        >
          <Sound
            url="/sound/fb3da276-6b3f-4f2b-a467-fc363675a490.mp3"
            open={false}
            isActive={isActive}
          />

          <Circle margin="1px 5px" borderRadius="50%" overflow="hidden">
            {state === "loaded" ? (
              <NextImage
                src={item.img}
                width={30}
                height={30}
                alt={item.name}
                loading="lazy"
              />
            ) : (
              <SkeletonCircle w={30} />
            )}
          </Circle>

          <Text mr="10px">
            {item.name} - {item.sex} - من {item.country}
          </Text>
        </Box>
        <Box marginRight="auto" >
          <Center w="100%" h="100%" >
          <Rating rating={3} />
          </Center>
        </Box>
      </Box>
    </ListItem>
  );
};

const Sound = ({
  url,
  open,
  isActive,
}: {
  url: string;
  open: boolean;
  isActive: boolean;
}) => {
  const audiRef = useRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);

  // Start [+++] Only runs when isActive params commin from the parent changes
  const activeFromPared = useMemo(() => isActive, [isActive]);
  React.useEffect(() => {
    if (activeFromPared) play();
    else if (!activeFromPared) stop();
  }, [activeFromPared, audiRef]);

  function play() {
    audiRef.current.play();
    setIsPlaying(true);
  }
  function stop() {
    audiRef.current.pause();
    audiRef.current.currentTime = 0.0;
    setIsPlaying(false);
  }

  const toogle = () => {
    if (isPlaying) return stop();
    else if (!isPlaying) return play();
  };

  return (
    <Circle onClick={toogle}>
      <audio ref={audiRef} src={url} onEnded={stop} onPause={stop} />

      {!isPlaying ? (
        <NextImage width={40} height={40} src={Play} />
      ) : (
        <NextImage width={40} height={40} src={Pause} />
      )}
    </Circle>
  );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { jwtVerify } from "../utils/jwt";
import Rating from "../components/Rating";
export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const TOKEN = req.cookies.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;

  let data;
  try {
    data = await jwtVerify(TOKEN, JWT_SECRET);
  } catch (error) {}

  const userType: any = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      userType,
      ...translation,
      data: Array.from({ length: 6 }, () => ({
        name: faker.name.firstName("male"),
        sex: "ذكر",
        country: faker.address.country(),
        date: faker.date.past(10).getFullYear(),
        word: faker.word.verb(),
        img: faker.image.avatar(),
        id: faker.random.numeric(10),
      })),
    },
  };
};
