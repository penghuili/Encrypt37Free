import { Anchor, Box, Button } from 'grommet';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Modal from '../shared/react-pure/Modal';
import Spacer from '../shared/react-pure/Spacer';

function Beer({ show, onClose, children }) {
  return (
    <Modal show={show} onClose={onClose}>
      <Box justify="end" direction="row">
        <Button icon={<RiCloseLine />} onClick={onClose}>
          Close
        </Button>
      </Box>
      <Spacer />
      <Anchor href="https://buy.stripe.com/14k3fYcz633kb2oeV1" target="_blank">
        Buy me a beer 🍺
      </Anchor>
      <Spacer />
      {children}
    </Modal>
  );
}

export default Beer;
