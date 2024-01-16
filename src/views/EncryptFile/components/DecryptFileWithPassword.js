import { Box, Button, FileInput, Text } from 'grommet';
import React, { useState } from 'react';
import { RiDownloadLine, RiLockUnlockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { decryptFileSymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import PasswordInput from '../../../shared/react-pure/PasswordInput';
import Spacer from '../../../shared/react-pure/Spacer';
import { inputFileToUnit8Array } from '../../../shared/react/file';
import { toastTypes } from '../../../shared/react/store/sharedReducer';

function DecryptFileWithPassword({ onToast }) {
  const [password, setPassword] = useState('');
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PasswordInput label="Password" value={password} onChange={setPassword} />
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
              const unit8Array = await inputFileToUnit8Array(encryptedFile);
              const decrypted = await decryptFileSymmetric(password, unit8Array);
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
          disabled={!password || !encryptedFile}
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

export default DecryptFileWithPassword;
