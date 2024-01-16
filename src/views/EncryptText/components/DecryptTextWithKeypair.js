import { Box, Button, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiFileCopyLine, RiLockUnlockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { getMessageContent } from '../../../lib/encryption-helper';
import { decryptMessageAsymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function DecryptTextWithPublicKey({ onToast }) {
  const [privateKey, setPrivateKey] = useState('');
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Text weight="bold">Private key</Text>
      <TextArea
        value={privateKey}
        onChange={e => setPrivateKey(e.target.value)}
        placeholder="Private key"
        resize="vertical"
        minLength="10rem"
      />
      <Spacer />

      <Text weight="bold">Encrypted text</Text>
      <TextArea
        value={encryptedText}
        onChange={e => setEncryptedText(e.target.value)}
        resize="vertical"
        minLength="10rem"
      />
      <Spacer />

      <HorizontalCenter>
        <Button
          primary
          label="Decrypt"
          onClick={async () => {
            try {
              const cleanPrivateKey = getMessageContent(privateKey.trim());
              const cleanEncryptedText = getMessageContent(encryptedText.trim());
              const decrypted = await decryptMessageAsymmetric(cleanPrivateKey, cleanEncryptedText);
              setText(decrypted);
              onToast('Decrypted!');
            } catch (error) {
              onToast(
                'Decryption failed. Check your private key and encrypted text.',
                toastTypes.critical
              );
            }
          }}
          icon={<RiLockUnlockLine />}
          disabled={!privateKey || !encryptedText}
        />

        {!!text && (
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

      {!!text && (
        <Box>
          <Text weight="bold">Decrypted text</Text>
          {text}
        </Box>
      )}

      <Beer show={showModal} onClose={() => setShowModal(false)}>
        <Button
          label="Copy"
          onClick={() => {
            copyToClipboard(text);
            onToast('Copied!');
          }}
          icon={<RiFileCopyLine />}
        />
      </Beer>
    </>
  );
}

export default DecryptTextWithPublicKey;
