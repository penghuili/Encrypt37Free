import { Anchor, Box } from 'grommet';
import React from 'react';
import { useLocation } from 'wouter';

function NavBar() {
  const [location, setLocation] = useLocation();

  return (
    <Box direction="row" justify="center" pad="1rem 0 0">
      <Anchor
        label="Text"
        color={location === '/' ? 'brand' : 'text'}
        onClick={() => {
          setLocation('/');
        }}
      />
      <Anchor
        label="File"
        color={location.startsWith('/file') ? 'brand' : 'text'}
        onClick={() => {
          setLocation('/file');
        }}
        margin="0 0 0 1rem"
      />
      <Anchor
        label="Generator"
        color={location.startsWith('/generator') ? 'brand' : 'text'}
        onClick={() => {
          setLocation('/generator');
        }}
        margin="0 0 0 1rem"
      />
    </Box>
  );
}

export default NavBar;
