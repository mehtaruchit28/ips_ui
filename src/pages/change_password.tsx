import Layout from "../components/layout/Layout";
import { Box,  useColorModeValue, Button, VStack, FormControl, Card, CardBody, FormLabel, Input, SimpleGrid, Container, Heading, CardFooter,FormErrorMessage } from "@chakra-ui/react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthWrapper from "../components/Authentication/AuthWrapper";

export default function change_password() {
    const bgGradient = useColorModeValue(
        'linear(to-br, gray.50, blue.50)',
        'linear(to-br, gray.900, blue.900)'
    )
    const [change_password, setChange_Password] = useState<{
        old_password: string;
        new_password: string;
        confirm_password: string;
    }>({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setChange_Password(prev => ({ ...prev, [name]: value }));
    };
    const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
     function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
      
      }, 3000)
    })
  }

    return (
        <AuthWrapper>
            <Layout>
                <Box bgGradient={bgGradient} minH="calc(100vh - 120px)" py={6}>
                    <Container maxW="full" px={{ base: 4, md: 8, lg: 16 }}>
                        <Box mb={8}>
                            <Heading size="lg" mb={2}>Change Password</Heading>

                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card bg='white' w="70%" borderWidth="1px" borderColor='gray.100' size='sm' shadow="sm">
                                <CardBody>
                                    <FormControl isRequired>
                                        <FormLabel>Old Password</FormLabel>
                                        <Input
                                            placeholder="Old Password"
                                            name="old_password"
                                            value={change_password.old_password}
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>New Password</FormLabel>
                                        <Input
                                            placeholder="New Password"
                                            name="new_password"
                                            value={change_password.new_password}
                                            onChange={handleInputChange}
                                        />
                                        <FormErrorMessage>New Password is required</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                            value={change_password.confirm_password}
                                            onChange={handleInputChange}
                                        />
                                        <FormErrorMessage>COnfirm Password is required</FormErrorMessage>
                                    </FormControl>

                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" colorScheme="teal" mr={3}>
                                        Save
                                    </Button>
                                    <Button variant="ghost" >
                                        Cancel
                                    </Button>
                                </CardFooter>

                            </Card>
                        </form>


                    </Container>

                </Box>
            </Layout >
        </AuthWrapper >
    )
}