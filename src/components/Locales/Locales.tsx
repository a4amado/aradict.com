import { setCookie } from 'cookies-next';
import FuzzySearch from 'fuzzy-search';
import i18next from 'i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';

import * as Chakra from '@chakra-ui/react';

import ES from '../../../public/ES.svg';
import ID from '../../../public/IN.svg';
import NL from '../../../public/NL.svg';
import SAUDI from '../../../public/SAUDI.svg';
import US from '../../../public/USA.svg';

const langs = [
  { name: "English", Flag: US, code: "en" },
  { name: "Arabic", Flag: SAUDI, code: "ar" },
  { name: "Spanish", Flag: ES, code: "es" },
  { name: "Dutch", Flag: NL, code: "nl" },
  { name: "Indonesia", Flag: ID, code: "id" },
];
const Locales: FC = () => {
  let { asPath, locale, pathname, query, push, locales } = useRouter();
  const { isOpen, onClose, onOpen, onToggle } = Chakra.useDisclosure();
  const [lang, setLang] = React.useState("");
  const SInput = useRef<HTMLInputElement>();

  const handleChange = (event) => setLang(event.target.value);
  const LangFind = new FuzzySearch(langs, ["name"], {
    caseSensitive: false,
  });
  const DefaultLang = new FuzzySearch(langs, ["code"], {
    caseSensitive: false,
  });
  const ShowLang = DefaultLang.search(locale);

  const ff = useRef();

  function Swith(lang: string) {
    if (lang === locale) return onClose();
    setCookie("NEXT_LOCALE", lang);

    i18next.changeLanguage(lang).finally(() => {
      push({ pathname, query }, asPath, {
        locale: lang,
        unstable_skipClientCache: true,
      });
    });
  }

  return (
    <>
      <Chakra.Button onClick={onOpen} ref={ff}>
        <Image
          src={ShowLang[0].Flag}
          width={50}
          height={30}
          alt={ShowLang[0].name}
        />
      </Chakra.Button>
      <Chakra.Portal>
        <Chakra.Modal
          closeOnEsc={true}
          finalFocusRef={ff}
          isOpen={isOpen}
          onClose={onClose}
        >
          <Chakra.ModalOverlay />

          <Chakra.ModalContent>
            <Chakra.ModalCloseButton />
            <Chakra.ModalBody my={20}>
              <Chakra.ModalHeader textAlign="center">
                <h2>Choose language</h2>
                <Chakra.Input
                  type="text"
                  ref={SInput}
                  autoFocus={true}
                  placeholder="Search ..."
                  onChange={handleChange}
                />
              </Chakra.ModalHeader>
              <Chakra.Grid
                templateColumns="repeat(auto-fit, minmax(200px, 1fr));"
                gap={5}
                overflowY="auto"
              >
                {(LangFind.search(lang) || locales).map(
                  ({ name, code, Flag }) => {
                    return (
                      <Chakra.GridItem  key={`${code}-flag`}>
                        <Chakra.Button w="100%" onClick={() => Swith(code)}>
                            {name}{" "}
                            <Image
                              src={Flag}
                              width={50}
                              height={30}
                              alt={name}
                            />{" "}
                          
                        </Chakra.Button>
                      </Chakra.GridItem>
                    );
                  }
                )}
              </Chakra.Grid>
            </Chakra.ModalBody>
          </Chakra.ModalContent>
        </Chakra.Modal>
      </Chakra.Portal>
    </>
  );
};
export default Locales;
export { langs };
