import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  VStack,
  FormControl,
  Input,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr, Th, Td,
  useToast
} from '@chakra-ui/react';

import { Header } from '../components/Header';
import { api } from '../services/api'

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    api.get("/clients").then(({ data }) => {
      setClients(data.data)
    })
  }, [clients])

  const isValidFormData = () => {
    if (!name) {
      return toast({
        title: "Preencha o campo nome!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

    if (!email) {
      return toast({
        title: "Preencha o campo e-mail!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }

    if (clients.some((client) => client.email === email && client._id !== id)) {
      return toast({
        title: "E-mail já cadastrado!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault()

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      const client = await api.post("/clients", { name, email });
      setClients(...clients, client)
      setName("");
      setEmail("");
      setId(null)
      setIsFormOpen(!isFormOpen);
      toast({
        title: "Cadastrado com sucesso!!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  const handleDeleteClient = async (_id) => {
    try {

      const client = await api.delete(`/clients/${_id}`);
      setClients(...clients, client)
      toast({
        title: "Deletado com sucesso!!",
        status: "info",
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleShowUpdateClient = (client) => {
    setId(client._id)
    setName(client.name)
    setEmail(client.email)
    setIsFormOpen(true);
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      const client = await api.put(`/clients/${id}`, { name, email });
      setClients(...clients, client)
      setName("");
      setEmail("");
      setId(null)
      setIsFormOpen(!isFormOpen);
      toast({
        title: "Atualizado com sucesso!!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <Box >
      <Header />
      <Flex align="center" justifyContent="center">
        <Box
          width={800}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt="25"
        >
          <Flex justifyContent="flex-end">
            <Button colorScheme="green" onClick={() => setIsFormOpen(!isFormOpen)}>{isFormOpen ? "-" : "+"}</Button>
          </Flex>

          {isFormOpen ? (
            <VStack as="form" onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite o nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite o e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="green" type="submit" mt={6} isLoading={isLoading}>
                {id ? "Atualizar" : "Cadastrar"}
              </Button>
            </VStack>
          ) : null}

          <Table variant="simple" mt={16}>
            <Thead bg="teal.500">
              <Tr>
                <Th textColor="white">Nome</Th>
                <Th textColor="white">E-mail</Th>
                <Th textColor="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client, index) => (
                <Tr key={index}>
                  <Td>{client.name}</Td>
                  <Td>{client.email}</Td>
                  <Td justifyContent="space-between">
                    <Flex>
                      <Button size="sm" fontSize="small" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateClient(client)}>Editar</Button>
                      <Button size="sm" fontSize="small" colorScheme="red" mr="2" onClick={() => handleDeleteClient(client._id)}>Remover</Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

        </Box>
      </Flex>
    </Box>
  )
}
