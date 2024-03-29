import { Button, FileInput, Text, TextArea } from 'grommet';
import React, { useState } from 'react';
import { RiDownloadLine, RiLockLine } from 'react-icons/ri';
import Beer from '../../../components/Beer';
import { getMessageContent } from '../../../lib/encryption-helper';
import { encryptFileAsymmetric } from '../../../shared/js/encryption';
import HorizontalCenter from '../../../shared/react-pure/HorizontalCenter';
import Spacer from '../../../shared/react-pure/Spacer';
import { inputFileToUnit8Array } from '../../../shared/react/file';

function EncryptFileWithKeypair({ onToast }) {
  const [publicKey, setPublicKey] = useState('');
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
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

      <Text weight="bold">Select file</Text>
      <FileInput
        name="file"
        onChange={event => {
          const fileList = event.target.files;
          const firstFile = fileList?.[0];
          if (firstFile) {
            setFile(firstFile);
          }
        }}
      />
      <Spacer />

      <HorizontalCenter>
        <Button
          primary
          label="Encrypt"
          onClick={async () => {
            const cleanPublicKey = getMessageContent(publicKey);
            const unit8Array = await inputFileToUnit8Array(file);
            const encrpted = await encryptFileAsymmetric(cleanPublicKey, unit8Array);
            const blob = new Blob([encrpted]);
            setEncryptedFile(blob);
            onToast('Encrypted!');
          }}
          icon={<RiLockLine />}
          disabled={!publicKey || !file}
        />

        {!!encryptedFile && (
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

      {!!encryptedFile && (
        <>
          <Text weight="bold">Encrypted file</Text>
          <Text weight="bold">{file.name}.e37</Text>
        </>
      )}

      <Beer show={showModal} onClose={() => setShowModal(false)}>
        <Button
          label="Download"
          onClick={async () => {
            window.saveAs(encryptedFile, `${file.name}.e37`);
          }}
          icon={<RiDownloadLine />}
          disabled={!encryptedFile}
        />
      </Beer>
    </>
  );
}

export default EncryptFileWithKeypair;
