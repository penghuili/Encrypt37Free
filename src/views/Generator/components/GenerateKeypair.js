import { Button, Heading, Text } from 'grommet';
import React, { useState } from 'react';
import MessageWrapper from '../../../components/MessageWrapper';
import { generateKeypair } from '../../../shared/js/encryption';
import Divider from '../../../shared/react-pure/Divider';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';

function GenerateKeypair({ onToast }) {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  return (
    <>
      <Button
        primary
        label="Generate keypair"
        onClick={async () => {
          const result = await generateKeypair();
          setPublicKey(`e37publickey:${result.publicKey}`);
          setPrivateKey(`e37privatekey:${result.privateKey}`);
          onToast('Keypair generated!');
        }}
      />

      {!!publicKey && !!privateKey && (
        <>
          <Spacer />
          <Divider />
          <Spacer />

          <Heading level={3} margin="0">
            Save your keypair in a save place
          </Heading>

          <Spacer size="2rem" />
          <HorizontalCenter>
            <Text weight="bold">Public key</Text>
            <Button
              label="Copy"
              onClick={() => {
                copyToClipboard(publicKey);
                onToast('Copied!');
              }}
              margin="0 0 0 1rem"
            />
          </HorizontalCenter>
          <MessageWrapper>{publicKey}</MessageWrapper>

          <Spacer size="3rem" />

          <HorizontalCenter>
            <Text weight="bold">Private key</Text>
            <Button
              label="Copy"
              onClick={() => {
                copyToClipboard(privateKey);
                onToast('Copied!');
              }}
              margin="0 0 0 1rem"
            />
          </HorizontalCenter>
          <MessageWrapper>{privateKey}</MessageWrapper>
        </>
      )}
    </>
  );
}

export default GenerateKeypair;
