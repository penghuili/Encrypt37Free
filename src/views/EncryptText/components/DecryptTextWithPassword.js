import { Box, Button, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiFileCopyLine, RiLockUnlockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { getMessageContent } from '../../../lib/encryption-helper';
import { decryptMessageSymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import PasswordInput from '../../../shared/react-pure/PasswordInput';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function DecryptTextWithPassword({ onToast }) {
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PasswordInput label="Password" value={password} onChange={setPassword} />
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
              const cleanEncryptedText = getMessageContent(encryptedText.trim());
              const decrypted = await decryptMessageSymmetric(password, cleanEncryptedText);
              setText(decrypted);
              onToast('Decrypted!');
            } catch (error) {
              onToast(
                'Decryption failed. Check your password and encrypted text.',
                toastTypes.critical
              );
            }
          }}
          icon={<RiLockUnlockLine />}
          disabled={!password || !encryptedText}
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

export default DecryptTextWithPassword;
