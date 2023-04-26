import React from 'react';
import { MantineProvider, Container } from '@mantine/core';
import CreateOrder from './CreateOrder';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <CreateOrder />
      </Container>
    </MantineProvider>
  );
}

export default App;
