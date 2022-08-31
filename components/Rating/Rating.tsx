import React from 'react';

import { StarIcon } from '@chakra-ui/icons';
import * as Chakra from '@chakra-ui/react';

import ConShow from '../Show';

const Rating = ({ rating = 0 }: { rating: number }) => {
  const [Rateing, setRating] = React.useState(rating);
  const [loading, { on, off }] = Chakra.useBoolean(false);

  const { isOpen, onClose, onOpen, onToggle } = Chakra.useDisclosure({
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
    <Chakra.Popover
      isOpen={isOpen}
      closeOnBlur={true}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
    >
      <Chakra.PopoverTrigger>
        <Chakra.Button textAlign="center">Rate</Chakra.Button>
      </Chakra.PopoverTrigger>

      <Chakra.Portal>
        <Chakra.PopoverContent>
          <Chakra.PopoverCloseButton onClick={onClose} />

          <Chakra.PopoverBody textAlign="center">
            <Chakra.PopoverArrow />
            <ConShow condetion={loading}>
              <Chakra.Center w="100%" h="100%">
                <Chakra.Spinner />
              </Chakra.Center>
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
          </Chakra.PopoverBody>
        </Chakra.PopoverContent>
      </Chakra.Portal>
    </Chakra.Popover>
  );
};

export default Rating;
