import { Box, Button, Text, Checkbox, Flex, Heading, Icon, Table, Th, Thead, Tr, Tbody, Td, useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Header } from "../../components/form/Header"
import { Pagination } from "../../components/form/Pagination"
import { SideBar } from "../../components/form/SideBar"

export default function UserList(){

  const isWideVersion = useBreakpointValue({
    base: false, 
    md: true,
    lg: true,
  })

  return(
      <Box>
      <Header/>

      <Flex w='100vw' my='6' maxWidth={1400} mx='auto' px='6'>
        <SideBar/>



        <Box flex='1' borderRadius={8} bg='gray.800'p='8'>
        <Flex mb='8' justify='space-between' align='center'>

          <Heading size='lg' fontWeight='normal'>Usuarios</Heading>

          <Link href='/users/create' passHref>
          <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine} fontSize='20'/>} >
            Criar novo
          </Button>
          </Link>

        </Flex>
          <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px={['4','4','6']} color='gray.300' w='8'>
                  <Checkbox colorScheme='pink'  />
                </Th>
                <Th>Usuarios</Th>
               {isWideVersion && ( <Th>Data de cadastro</Th>)}
                <Th w='8'></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4','4','6']}>
                <Checkbox colorScheme='pink'  />
                </Td>

                    <Td>
                    <Box>
                      <Text fontWeight='bold'>Maikon Alexandre</Text>
                      <Text fontSize='sm'>@maikonalexandre574@gmail.com</Text>
                    </Box>
                    </Td>


                    { isWideVersion && <Td>04 de abril de, 2022</Td>}

                  <Td>
                {isWideVersion && (
                     <Button
                     as='a'
                     size='sm'
                     fontSize='sm'
                     colorScheme='purple'
                     leftIcon={<Icon as={RiPencilLine} fontSize='16'/>}
                     >
                     Editar
                     </Button>
                )}
                    </Td>
              
              </Tr>
            </Tbody>
          </Table>
          <Pagination/>

        </Box>
        </Flex>              
      </Box>
    )
}