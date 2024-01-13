import { Tab, Tabs } from 'grommet';
import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import DecryptTextWithPublicKey from './components/DecryptTextWithKeypair';
import DecryptTextWithPassword from './components/DecryptTextWithPassword';
import EncryptTextWithKeypair from './components/EncryptTextWithKeypair';
import EncryptTextWithPassword from './components/EncryptTextWithPassword';

function EncryptText({ onToast }) {
  return (
    <>
      <AppBar title="Encrypt & decrypt text" />
      <ContentWrapper>
        <Tabs style={{ width: '100%' }} justify="start">
          <Tab title="With password">
            <Tabs style={{ width: '100%' }} justify="start">
              <Tab title="Encrypt">
                <Spacer />
                <EncryptTextWithPassword onToast={onToast} />
              </Tab>

              <Tab title="Decrypt">
                <Spacer />
                <DecryptTextWithPassword onToast={onToast} />
              </Tab>
            </Tabs>
          </Tab>

          <Tab title="With keypair">
            <Tabs style={{ width: '100%' }} justify="start">
              <Tab title="Encrypt">
                <Spacer />
                <EncryptTextWithKeypair onToast={onToast} />
              </Tab>

              <Tab title="Decrypt">
                <Spacer />
                <DecryptTextWithPublicKey onToast={onToast} />
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </ContentWrapper>
    </>
  );
}

export default EncryptText;
