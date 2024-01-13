import { Tab, Tabs } from 'grommet';
import React from 'react';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import GenerateKeypair from './components/GenerateKeypair';
import GeneratePassword from './components/GeneratePassword';

function Generator({ onToast }) {
  return (
    <>
      <AppBar title="Generator" />
      <ContentWrapper>
        <Tabs style={{ width: '100%' }} justify="start">
          <Tab title="Password">
            <Spacer />
            <GeneratePassword onToast={onToast} />
          </Tab>

          <Tab title="Keypair">
            <Spacer />
            <GenerateKeypair onToast={onToast} />
          </Tab>
        </Tabs>
      </ContentWrapper>
    </>
  );
}

export default Generator;
