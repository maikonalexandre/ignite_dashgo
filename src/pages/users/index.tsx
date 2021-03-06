import {
  Box,
  Button,
  Text,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/form/Header";
import { Pagination } from "../../components/form/Pagination";
import { SideBar } from "../../components/form/SideBar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient'

export default function UserList() {
  const [page, setPage] =  useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page);
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  async function handlePrefetUser(userId: string){
    await queryClient.prefetchQuery(['user', userId],async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    },{
      staleTime: 1000 * 60 * 10 //10 minutos
    }
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100vw" my="6" maxWidth={1400} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuarios
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="2" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar os dados dos usuarios</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuarios</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>

                        <Td> 
                          <Box>
                            <Link color='purple.400' onMouseEnter={()=> handlePrefetUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                            </Link>

                            <Text fontSize="sm">{user.email}</Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        <Td>
                          {isWideVersion && (
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination 
                totalCountRegistros={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
