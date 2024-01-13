import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import EncryptFile from '../views/EncryptFile';
import EncryptText from '../views/EncryptText';
import Generator from '../views/Generator';

function Router() {
  return (
    <Switch>
      <Route path="/file" component={EncryptFile} />
      <Route path="/generator" component={Generator} />

      <Route path="/" component={EncryptText} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
