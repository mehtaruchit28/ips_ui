import React, { useEffect, useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { useRouter } from 'next/router';
import { Spinner, Box, Center } from '@chakra-ui/react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticated = AuthService.isAuthenticated();
                
                if (!authenticated) {
                    await router.replace('/login');
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                await router.replace('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [router]);

    // Show spinner while checking authentication or redirecting
    if (isLoading || !isAuthenticated) {
        return (
            <Center height="100vh">
                <Box textAlign="center">
                    <Spinner 
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Box mt={4} color="gray.600">
                        Loading...
                    </Box>
                </Box>
            </Center>
        );
    }

    // Only render children if authenticated
    return (
        <div className="auth-wrapper">
            {children}
        </div>
    );
};

export default AuthWrapper;
