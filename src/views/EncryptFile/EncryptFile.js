import { Tab, Tabs } from 'grommet';
import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import DecryptFileWithKeypair from './components/DecryptFileWithKeypair';
import DecryptFileWithPassword from './components/DecryptFileWithPassword';
import EncryptFileWithKeypair from './components/EncryptFileWithKeypair';
import EncryptFileWithPassword from './components/EncryptFileWithPassword';

function EncryptFile({ onToast }) {
  return (
    <>
      <AppBar title="Encrypt & decrypt file" />
      <ContentWrapper>
        <Tabs style={{ width: '100%' }} justify="start">
          <Tab title="With password">
            <Tabs style={{ width: '100%' }} justify="start">
              <Tab title="Encrypt">
                <Spacer />
                <EncryptFileWithPassword onToast={onToast} />
              </Tab>

              <Tab title="Decrypt">
                <Spacer />
                <DecryptFileWithPassword onToast={onToast} />
              </Tab>
            </Tabs>
          </Tab>

          <Tab title="With keypair">
            <Tabs style={{ width: '100%' }} justify="start">
              <Tab title="Encrypt">
                <Spacer />
                <EncryptFileWithKeypair onToast={onToast} />
              </Tab>

              <Tab title="Decrypt">
                <Spacer />
                <DecryptFileWithKeypair onToast={onToast} />
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </ContentWrapper>
    </>
  );
}

export default EncryptFile;
