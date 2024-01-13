import { Anchor, Text } from 'grommet';
import React from 'react';
import ContentWrapper from '../shared/react-pure/ContentWrapper';
import Divider from '../shared/react-pure/Divider';
import Spacer from '../shared/react-pure/Spacer';

function Footer() {
  return (
    <ContentWrapper>
      <Divider />
      <Spacer />
      <Text>End-to-end encrypt text and files, and get raw result.</Text>
      <Text weight="bold">Open source, no tracking and free forever.</Text>
      <Text>
        <Text weight="bold">Encrypt37Free has no server, everything happens on your device:</Text>{' '}
        The password, your key pair, the encryption process, the encrypted texts and files.
      </Text>
      <Text>
        You can safely upload the encrypted texts or files to wherever you want, making any cloud
        provider an encrypted storage.
      </Text>
      <Text>
        Everything is encrypted by the battle tested algorithm PGP{' '}
        <Anchor
          label="PGP"
          href="https://en.wikipedia.org/wiki/Pretty_Good_Privacy"
          target="_blank"
        />
        . The algorithm is used by Proton, Mailvelope, Encrypt.to and many others.
      </Text>

      <Spacer />
      <Anchor href="https://buy.stripe.com/14k3fYcz633kb2oeV1" target="_blank">
        Buy me a beer 🍺
      </Anchor>
      <Text>
        Want to save your encrypted words and files to cloud, so it's easy to sync on different
        devices? Check{' '}
        <Anchor href="https://encrypt37.com" target="_blank">
          Encrypt37
        </Anchor>
      </Text>
      <Text>
        And check everything I build at{' '}
        <Anchor href="https://peng37.com" target="_blank">
          peng37.com
        </Anchor>
      </Text>
    </ContentWrapper>
  );
}

export default Footer;
