import i18next from "i18next";
import { useRouter } from "next/router";
import React, { FC, useRef } from "react";
import styles from "./locales.module.scss";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalOverlay,
  HStack,
  Grid,
  GridItem,
  Input,
  usePinInput,
} from "@chakra-ui/react";
import US from "../../public/USA.svg";
import SAUDI from "../../public/SAUDI.svg";
import NL from "../../public/NL.svg";
import ID from "../../public/IN.svg";
import ES from "../../public/ES.svg";


const langs = [
  { name: "English", Flag: US, code: "en" },
  { name: "Arabic", Flag: SAUDI, code: "ar" },
  { name: "Spanish", Flag: ES, code : "es" },
  { name: "Dutch", Flag: NL, code :"nl" },
  { name: "Indonesia", Flag: ID, code: "id" },
];
import FuzzySearch from "fuzzy-search";
import Image from "next/image";

const Locales: FC = () => {
  let { asPath, locale, pathname, query, push, locales } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [lang, setLang] = React.useState("");

  const handleChange = (event) => setLang(event.target.value);
  const LangFind = new FuzzySearch(langs, ["name"], {
    caseSensitive: false
  });
  const DefaultLang = new FuzzySearch(langs, ["code"], {
    caseSensitive: false
  });
  const ShowLang = DefaultLang.search(locale);

  const ff = useRef();


  function Swith(lang: string) {
    push({ pathname, query}, asPath, { locale: lang });
  }
  return (
    <>
      <Button onClick={onOpen} ref={ff}>
      <Image src={ShowLang[0].Flag} width={50} height={30} alt={ShowLang[0].name}/>
      </Button>
      <Modal finalFocusRef={ff} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />
          <ModalBody my={20}>
            <ModalHeader textAlign="center">
              <h2>Choose language</h2>
              <Input type="text"  onChange={handleChange}/>
            </ModalHeader>
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, 1fr));"
              gap={5}
              overflowY="auto"
            >
              {(LangFind.search(lang) || locales).map(({name, code, Flag}) => {
                return (
                  <GridItem>
                    <Button w="100%" onClick={() => Swith(code)}>
                      <>{name} <Image src={Flag} width={50} height={30} alt={name}/> </>
                    </Button>
                  </GridItem>
                );
              })}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Locales;
export { langs };
