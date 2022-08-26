import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  ModalOverlay,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ConShow from "../Show";

const Rating = ({ rating = 0 }: { rating: number }) => {
  const [Rateing, setRating] = React.useState(rating);
  const [loading, { on, off }] = useBoolean(false);

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });
  const initialFocusRef = React.useRef();

  function submitRating() {
    on();
    setTimeout(() => {
      off();
    }, 800);
  }

  return (
    <Popover
      isOpen={isOpen}
      closeOnBlur={true}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        <Text textAlign="center">Rate</Text>
      </PopoverTrigger>

      <Portal>
        <PopoverContent>
          <PopoverCloseButton onClick={onClose} />

          <PopoverBody textAlign="center">
            <PopoverArrow />
            <ConShow condetion={loading}>
              <Center w="100%" h="100%">
                <Spinner />
              </Center>
            </ConShow>
            <ConShow condetion={!loading}>
              <React.Fragment>
                {Array.from({ length: 5 }, (_, i) =>
                  i < Rateing ? true : false
                ).map((isActiveStar, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    onMouseEnter={() => setRating(starIndex + 1)}
                    onMouseLeave={() => {
                      setRating(rating);
                    }}
                    color={isActiveStar ? "goldenrod" : "black"}
                    onClick={submitRating}
                  />
                ))}
              </React.Fragment>
            </ConShow>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Rating;
