import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  useToast,
  Image,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AuthService } from '../services/AuthService' // Import your AuthService here

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your authentication logic here
    const result = await AuthService.login(email, password);
    if (result) {
      // For demo purposes, just redirect to home
      router.push('/home')
    } else {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.800">
      <Container maxW="md" py={12} px={[6, 8]} bg="white" borderRadius="xl" boxShadow="card">
        <VStack spacing={8} align="stretch">
          <VStack spacing={3}>
            <Image 
              src="/logo.png" 
              alt="Logo" 
              height={12} 
              fallback={<Box h={12} />} 
            />
            <Heading size="lg" textAlign="center">IPS</Heading>
            <Text color="gray.600" textAlign="center">
              Sign in to access your account
            </Text>
          </VStack>
          
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                />
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="blue" 
                w="100%" 
                size="lg"
                _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                _active={{ transform: 'translateY(0)' }}
              >
                Sign In
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Flex>
  )
}