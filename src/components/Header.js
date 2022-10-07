import { Heading, Flex } from '@chakra-ui/react';

export const Header = () => {
    return (
        <Flex as="nax" align="center" justify="space-between" wrap="wrap" padding={6} bg="teal.500" color="white">
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"tighter"}>Cadastro de Clientes</Heading>
            </Flex>
        </Flex>
    )
}