import { Box, Button, FileInput, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiDownloadLine, RiLockUnlockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { getMessageContent } from '../../../lib/encryption-helper';
import { decryptFileAsymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Spacer from '../../../shared/react-pure/Spacer';
import { inputFileToUnit8Array } from '../../../shared/react/file';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function DecryptFileWithKeypair({ onToast }) {
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [file, setFile] = useState(null);
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

      <Text weight="bold">Select encrypted file</Text>
      <FileInput
        name="file"
        onChange={event => {
          const fileList = event.target.files;
          const firstFile = fileList?.[0];
          if (firstFile) {
            setEncryptedFile(firstFile);
          }
        }}
      />
      <Spacer />

      <HorizontalCenter>
        <Button
          primary
          label="Decrypt"
          onClick={async () => {
            try {
              const cleanPrivatekey = getMessageContent(privateKey);
              const unit8Array = await inputFileToUnit8Array(encryptedFile);
              const decrypted = await decryptFileAsymmetric(cleanPrivatekey, unit8Array);
              const blob = new Blob([decrypted]);
              setFile(blob);
              onToast('Decrypted!');
            } catch (error) {
              console.log(error);
              onToast(
                'Decryption failed. Check your password and encrypted file.',
                toastTypes.critical
              );
            }
          }}
          icon={<RiLockUnlockLine />}
          disabled={!privateKey || !encryptedFile}
        />

        {!!file && (
          <Button
            label="Download"
            onClick={async () => {
              setShowModal(true);
            }}
            icon={<RiDownloadLine />}
            disabled={!encryptedFile}
            margin="0 0 0 1rem"
          />
        )}
      </HorizontalCenter>
      <Spacer />

      {!!file && (
        <Box>
          <Text weight="bold">Decrypted file</Text>
          {encryptedFile.name.replace('.e37', '')}
        </Box>
      )}

      <Beer show={showModal} onClose={() => setShowModal(false)}>
        <Button
          label="Download"
          onClick={async () => {
            const fileName = encryptedFile.name.replace('.e37', '');
            window.saveAs(file, fileName);
          }}
          icon={<RiDownloadLine />}
          disabled={!encryptedFile}
        />
      </Beer>
    </>
  );
}

export default DecryptFileWithKeypair;
