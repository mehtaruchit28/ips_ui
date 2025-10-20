import { Box, useDisclosure } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <Box minH="100vh" bg="gray.800">
      <Header 
        onShowSidebar={onOpen}
        isCollapsed={isSidebarCollapsed}
      />
      <Sidebar 
        isOpen={isOpen} 
        onClose={onClose}
        onCollapse={setIsSidebarCollapsed}
      />
      <Box
        as="main"
        ml={{ 
          base: 0, 
          md: isSidebarCollapsed ? "60px" : "240px"
        }}
        transition="all .3s ease"
        pt="14" // Header height
        pb="16" // Footer height
        px={4}
        bg="gray.50"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout