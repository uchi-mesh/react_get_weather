import React from 'react';
import { Heading, Box, Stack } from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <Stack
        p={4}
        borderBottom="1px"
        borderColor="blackAlpha.400"
        boxShadow="md">
        <Box>
          <Heading as="h1" size="xl">
            天気取得アプリ
          </Heading>
        </Box>
      </Stack>
    </header>
  );
};

export default Header;
