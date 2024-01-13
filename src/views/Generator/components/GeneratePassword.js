import { Button, CheckBox, RangeInput, Text } from 'grommet';
import React, { useState } from 'react';
import { generatePassword } from '../../../shared/js/generatePassword';
import Divider from '../../../shared/react-pure/Divider';
import Spacer from '../../../shared/react-pure/Spacer';
import copyToClipboard from '../../../shared/react/copyToClipboard';

function GeneratePassword({ onToast }) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(20);
  const [withSpecialCharacters, setWithSpecialCharacters] = useState(true);

  return (
    <>
      <Text weight="bold">Password length: {length}</Text>
      <RangeInput
        value={length}
        min={8}
        max={50}
        onChange={e => {
          const newLength = e.target.value;
          setLength(newLength);
          setPassword(generatePassword(newLength, withSpecialCharacters));
        }}
      />
      <Spacer />

      <CheckBox
        label="Include special characters"
        checked={withSpecialCharacters}
        onChange={() => {
          const newValue = !withSpecialCharacters;
          setWithSpecialCharacters(newValue);
          setPassword(generatePassword(length, newValue));
        }}
      />
      <Spacer />

      <Button
        primary
        label="Generate Password"
        onClick={() => {
          setPassword(generatePassword(length, withSpecialCharacters));
          onToast('Password generated!');
        }}
        disabled={!length}
      />

      {!!password && (
        <>
          <Spacer />
          <Divider />
          <Spacer />
          <Text>{password}</Text>
          <Spacer />
          <Button
            label="Copy"
            onClick={() => {
              copyToClipboard(password);
              onToast('Copied!');
            }}
          />
        </>
      )}
    </>
  );
}

export default GeneratePassword;
