import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfilePorps {
  showProfileData?: boolean;
}


export function Profile({showProfileData = true}: ProfilePorps){
  return(
    <Flex align="center">
  { showProfileData && (
      <Box>
      <Text mr="4" textAlign="right">
        Maikon Alexandre
      </Text>
      <Text color="gray.300" fontSize="small" >
        maikonalexandre574@gmail.com
      </Text>
    </Box>
  )}
    <Avatar
      size="md"
      src="https://github.com/maikonalexandre.png"
      name="Maikon Alexandre"
    />
  </Flex>
  );
}