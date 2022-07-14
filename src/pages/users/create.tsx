import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { Header } from "../../components/form/Header"
import { Input } from "../../components/form/Input"
import { SideBar } from "../../components/form/SideBar"

export default function CreateUser(){

  return(
      <Box>
      <Header/>

      <Flex w='100vw' my='6' maxWidth={1400} mx='auto' px='6'>
        <SideBar/>
        <Box flex='1' borderRadius={8} bg='gray.800'p={['6','8']}>
        <Heading size='lg' fontWeight='normal'>Criar usuarios</Heading>
        <Divider my='6' borderColor='gray.700'/>
        
        <VStack spacing='8'>
          <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
            <Input name='name' label="Nome completo"   />
            <Input name='email' label="E-mail" type='email'/>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
            <Input name='password' label="Senha" type='password'   />
            <Input name='password_confirmation' label="Confirme sua senha" type='password'/>
          </SimpleGrid>
        </VStack>

        <Flex mt='8' justify='flex-end'>
          <HStack spacing='4'>

            <Link href='/users' passHref>
            <Button colorScheme='whiteAlpha'>
              Cancelar
            </Button></Link>

            <Button colorScheme='pink'>
              Salvar
            </Button>

          </HStack>
        </Flex>


        </Box>
        </Flex>              
      </Box>
    )
}