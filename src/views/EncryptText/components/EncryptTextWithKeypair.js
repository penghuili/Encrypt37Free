import { Box, Button, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiFileCopyLine, RiLockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import MessageWrapper from '../../../components/MessageWrapper';
import { getMessageContent } from '../../../lib/encryption-helper';
import { encryptMessageAsymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function EncryptTextWithKeypair({ onToast }) {
  const [publicKey, setPublicKey] = useState('');
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Text weight="bold">Public key</Text>
      <TextArea
        value={publicKey}
        onChange={e => setPublicKey(e.target.value)}
        placeholder="Public key"
        resize="vertical"
        minLength="10rem"
      />
      <Spacer />

      <Text weight="bold">Text</Text>
      <TextArea
        value={text}
        onChange={e => setText(e.target.value)}
        resize="vertical"
        minLength="10rem"
      />
      <Spacer />

      <HorizontalCenter>
        <Button
          primary
          label="Encrypt"
          onClick={async () => {
            try {
              const cleanPrivateKey = getMessageContent(publicKey.trim());
              const encrpted = await encryptMessageAsymmetric(cleanPrivateKey, text);
              setEncryptedText(`e37:${encrpted}`);
              onToast('Encrypted!');
            } catch (error) {
              onToast('Something went wrong. Check your public key.', toastTypes.critical);
            }
          }}
          icon={<RiLockLine />}
          disabled={!publicKey || !text}
        />

        {!!encryptedText && (
          <Button
            label="Copy"
            onClick={() => {
              setShowModal(true);
            }}
            icon={<RiFileCopyLine />}
            margin="0 0 0 1rem"
          />
        )}
      </HorizontalCenter>
      <Spacer />

      {!!encryptedText && (
        <Box>
          <Text weight="bold">Encrypted text</Text>
          <MessageWrapper>{encryptedText}</MessageWrapper>
        </Box>
      )}

      <Beer show={showModal} onClose={() => setShowModal(false)}>
        <Button
          label="Copy"
          onClick={() => {
            copyToClipboard(encryptedText);
            onToast('Copied!');
          }}
          icon={<RiFileCopyLine />}
        />
      </Beer>
    </>
  );
}

export default EncryptTextWithKeypair;
