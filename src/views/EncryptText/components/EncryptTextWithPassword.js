import { Box, Button, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiFileCopyLine, RiLockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { encryptMessageSymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import PasswordInput from '../../../shared/react-pure/PasswordInput';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function EncryptTextWithPassword({ onToast }) {
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PasswordInput label="Password" value={password} onChange={setPassword} />
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
              const encrpted = await encryptMessageSymmetric(password, text);
              setEncryptedText(`e37:${encrpted}`);
              onToast('Encrypted!');
            } catch (error) {
              onToast('Something went wrong.', toastTypes.critical);
            }
          }}
          icon={<RiLockLine />}
          disabled={!password || !text}
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
          {encryptedText}
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

export default EncryptTextWithPassword;
