export const AuthService = {
    login: async (email: string, password: string) => {
        // Simulate an API call
        if(email === 'admin@admin.com' && password === 'password') {
            localStorage.setItem('token', 'fake-jwt-token');
            return { token: 'fake-jwt-token', user: { name: 'Admin User', email: '  admin' } };
        }
        return null;
    },
    logout: () => {
        // Clear user session
        localStorage.removeItem('token');
        console.log('User logged out');
    },
    isAuthenticated: () => {
        // Check if user is authenticated
        return !!localStorage.getItem('token');
    }
};