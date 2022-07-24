import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Header } from "../../components/form/Header";
import { Input } from "../../components/form/Input";
import { SideBar } from "../../components/form/SideBar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {useMutation} from '@tanstack/react-query'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateFormData = {
  nome: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};


const CreateUserFormSchema = yup.object({
  nome: yup.string().required("Nome é um campo obrigaório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail invalido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No minimo 6 digitos"),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "A senha precisa ser igual"),
});

export default function CreateUser() {

  const router = useRouter();

  const createUser = useMutation(async (user: CreateFormData)=> {
    const response = await api.post('users', {
      user: {
        ...user,
        createdAt: new Date(),
      }
    })

    return response.data.user;
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
  };

  return (
    <Box>
      <Header />

      <Flex w="100vw" my="6" maxWidth={1400} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuarios
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome completo"
                error={errors.nome}
                {...register("nome")}
              />
              <Input
                label="E-mail"
                error={errors.email}
                type="email"
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Senha"
                error={errors.password}
                type="password"
                {...register("password")}
              />
              <Input
                label="Confirme sua senha"
                type="password"
                error={errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>

              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
