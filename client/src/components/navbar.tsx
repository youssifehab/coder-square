import { Flex, Box, Button } from "@chakra-ui/react";

export const NavBar = () => {
  return (
    <Flex justify="space-between" m={4}>
      <Box>Codersquare</Box>
      <Flex gap={2}>
        <Button>Sign in</Button>
        <Button>Sign up</Button>
      </Flex>
    </Flex>
  );
};
