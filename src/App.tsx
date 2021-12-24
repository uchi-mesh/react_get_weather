import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Header from '_components/Header';
import Home from 'pages/Home';

function App() {
  return (
    <Box>
      <Header />
      <Stack spacing={6} py={6} px={6} m="auto" maxW="container.lg">
        <Home />
      </Stack>
    </Box>
  );
}

export default App;
