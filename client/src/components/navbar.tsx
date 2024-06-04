import { Flex, Box, Button, Image } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
export const NavBar = () => {
  return (
    <Flex justify="space-between" m={4} align="center">
      <Box>
        <Image src={logo} />
      </Box>
      <Flex gap={2}>
        <Button variant="ghost">Sign in</Button>
        <Button>Sign up</Button>
      </Flex>
    </Flex>
  );
};
