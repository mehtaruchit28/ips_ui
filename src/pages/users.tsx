import React, { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    useColorModeValue,
    Icon
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import AuthWrapper from '../components/Authentication/AuthWrapper';
type UserRole = 'Admin' | 'Manager' | 'Member';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const initialUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Manager' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Member' },
];
export default function users() {
    const bgGradient = useColorModeValue(
        'linear(to-br, gray.50, blue.50)',
        'linear(to-br, gray.900, blue.900)'
    )
      const [users, setUsers] = useState<User[]>(initialUsers);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'Member',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: '', email: '', role: 'Member' });
    onClose();
  };

    return (
        <AuthWrapper>
            <Layout>
                <Box bgGradient={bgGradient} minH="calc(100vh - 120px)" py={6}>
                    <Heading mb={4}>Users</Heading>
                    <Button colorScheme="teal" onClick={onOpen} mb={4}>
                        Add User
                    </Button>

                    <TableContainer>
                        <Table variant="striped" colorScheme="blackAlpha">
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Role</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user) => (
                                    <Tr key={user.id}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.role}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add New User</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <VStack spacing={4} align="stretch">
                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            placeholder="Full Name"
                                            name="name"
                                            value={newUser.name}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            value={newUser.email}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            name="role"
                                            value={newUser.role}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Member">Member</option>
                                        </Select>
                                    </FormControl>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="teal" mr={3} onClick={handleAddUser}>
                                    Add
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Layout>
        </AuthWrapper>
    )
}