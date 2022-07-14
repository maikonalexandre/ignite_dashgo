import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/form/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

type singInFormData = {
  email: string;
  password: string;
}

export default function SingIn () {

  const {register, handleSubmit, formState} = useForm();


const {errors} = formState;  
console.log(errors);


  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);
  }

  return (
  <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
    <Flex
      as="form"
      w="100%"
      maxW="360px"
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
      >

      <Stack spacing="4">

      <Input type="email" label="email"  {...register(('email') ,{
        required: "Campo obrigatório"
      })} />

      <Input type="password" label='Senha' {...register(('password'), {
        required: 'Campo obrigatório'
      })} />

      </Stack>
        

  <Button type='submit' mt="6" colorScheme="pink" isLoading={formState.isSubmitting}>
      Entrar
      </Button>
    </Flex>
    </Flex>
  )
}

