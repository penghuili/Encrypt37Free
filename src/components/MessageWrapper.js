import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow-x: auto;

  pre {
    white-space: pre-wrap;
  }
`;

function MessageWrapper({ children }) {
  return (
    <Wrapper>
      <pre>{children}</pre>
    </Wrapper>
  );
}

export default MessageWrapper;
