import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
        minHeight: '100vh',
        transition: 'background-color 0.2s',
      },
    }),
  },
  colors: {
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.800',
            borderWidth: '1px',
            borderColor: 'gray.700',
            _hover: {
              bg: 'gray.700',
            },
            _focus: {
              bg: 'gray.800',
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
    Heading: {
      baseStyle: {
        color: 'whiteAlpha.900',
        fontWeight: 'bold',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          borderRadius: 'lg',
          borderWidth: '1px',
          borderColor: 'gray.700',
        },
      },
    },
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
})

export default theme