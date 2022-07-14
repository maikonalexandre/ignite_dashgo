import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBarDrawer } from "../../../Context/SideBarContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./Notifications";
import { Profile } from "./Perfil";
import { SearchBox } from "./SearchBox";

export function Header() {
  const {onOpen} = useSideBarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false, lg: true
  })
  return (
    <Flex
      as="header"
      w="100vw"
      maxW={1400}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >

      {!isWideVersion && (
        <IconButton
        aria-label="Open navegation"
        icon={<Icon as={RiMenuLine} />}
        fontSize='24'
        variant='unstyled'
        onClick={onOpen}
        mr='2'
        ></IconButton>
      )}
      <Logo/>
      {isWideVersion && (<SearchBox/>)}
      <Flex align="center" ml="auto">
        <NotificationsNav/>
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
