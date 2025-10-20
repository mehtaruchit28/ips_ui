import React, { useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  Icon,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  Button
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiDatabase, 
  FiMenu, 
  FiArrowLeft,
  FiShield,
  FiPieChart,
  FiMap,
  FiFileText
} from 'react-icons/fi'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onCollapse?: (isCollapsed: boolean) => void
}

interface NavItemProps {
  icon: React.ElementType
  children?: React.ReactNode
  href: string
  isCollapsed?: boolean
}

const NavItem = ({ icon, children, href, isCollapsed }: NavItemProps) => {
  const router = useRouter()
  const isActive = router.pathname === href
  const activeBg = useColorModeValue('blue.50', 'rgba(49, 130, 206, 0.24)')
  const activeColor = useColorModeValue('blue.600', 'blue.200')
  const inactiveColor = useColorModeValue('gray.600', 'gray.400')
  const hoverBg = useColorModeValue('blue.50', 'rgba(49, 130, 206, 0.16)')
  
  return (
    <Link
      as={NextLink}
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      title={typeof children === 'string' ? children : undefined}
    >
      <Flex
        align="center"
        p="4"
        mx={isCollapsed ? "2" : "4"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : inactiveColor}
        _hover={{
          bg: hoverBg,
          color: activeColor,
          transform: 'translateX(4px)',
        }}
        transition="all 0.2s ease"
        justifyContent={isCollapsed ? "center" : "flex-start"}
      >
        <Icon
          fontSize="18"
          as={icon}
          mr={isCollapsed ? "0" : "4"}
        />
        {!isCollapsed && children}
      </Flex>
    </Link>
  )
}

const Sidebar = ({ isOpen, onClose, onCollapse }: SidebarProps) => {
  const bg = useColorModeValue(
    'linear-gradient(to bottom, gray.50, gray.50)',
    'linear-gradient(to bottom, gray.800, gray.900)'
  )
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleCollapse = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    onCollapse?.(newCollapsedState)
  }

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  const SidebarContainer = (
    <Box 
      bgGradient={bg}
      borderRightWidth="1px"
      borderColor={borderColor}
      w={isCollapsed ? "60px" : "240px"}
      transition="all 0.3s ease"
      h="100vh"
      position="fixed"
      top={0}
      left={0}
      boxShadow={`4px 0 12px -2px ${shadowColor}`}
      backdropFilter="blur(10px)"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.7,
        bgGradient: bg,
        zIndex: -1
      }}
    >
      <Flex 
        h="14" 
        alignItems="center" 
        justifyContent="space-between" 
        px={4}
        borderBottomWidth="1px"
        borderColor={borderColor}
        backdropFilter="blur(10px)"
        bg={useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)')}
      >
       
        <IconButton
          aria-label={isCollapsed ? "Expand" : "Collapse"}
          icon={isCollapsed ? <Icon as={FiMenu} /> : <Icon as={FiArrowLeft} />}
          variant="ghost"
          onClick={handleCollapse}
          size="sm"
          _hover={{
            bg: useColorModeValue('blue.50', 'whiteAlpha.100'),
          }}
        />
      </Flex>
     <VStack spacing={2} align="stretch" pt={4} px={isCollapsed ? 1 : 2}>
        <Accordion allowMultiple defaultIndex={isCollapsed ? [0, 1] : []}>
          {/* Admin Section */}
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  _hover={{ bg: useColorModeValue('blue.50', 'whiteAlpha.100') }}
                  borderRadius="md"
                  px={isCollapsed ? 2 : 4}
                  py={2}
                >
                  <Flex align="center" flex="1">
                    <Icon
                      as={FiShield}
                      fontSize="18"
                      mr={isCollapsed ? 0 : 2}
                      color={isExpanded ? "blue.500" : undefined}
                    />
                    {!isCollapsed && (
                      <Text fontWeight="medium">Admin</Text>
                    )}
                  </Flex>
                  {!isCollapsed && <AccordionIcon />}
                </AccordionButton>
                <AccordionPanel pb={2} px={isCollapsed ? 0 : 2}>
                  <VStack align="stretch" spacing={1}>
                    <NavItem
                      icon={FiHome}
                      href="/home"
                      isCollapsed={isCollapsed}
                    >
                      Dashboard
                    </NavItem>
                    <NavItem
                      icon={FiUsers}
                      href="/users"
                      isCollapsed={isCollapsed}
                    >
                      Users
                    </NavItem>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Reports Section */}
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  _hover={{ bg: useColorModeValue('blue.50', 'whiteAlpha.100') }}
                  borderRadius="md"
                  px={isCollapsed ? 2 : 4}
                  py={2}
                >
                  <Flex align="center" flex="1">
                    <Icon
                      as={FiPieChart}
                      fontSize="18"
                      mr={isCollapsed ? 0 : 2}
                      color={isExpanded ? "blue.500" : undefined}
                    />
                    {!isCollapsed && (
                      <Text fontWeight="medium">Reports</Text>
                    )}
                  </Flex>
                  {!isCollapsed && <AccordionIcon />}
                </AccordionButton>
                <AccordionPanel pb={2} px={isCollapsed ? 0 : 2}>
                  <VStack align="stretch" spacing={1}>
                    <NavItem
                      icon={FiMap}
                      href="/state_county_map"
                      isCollapsed={isCollapsed}
                    >
                      State/County Map
                    </NavItem>
                    <NavItem
                      icon={FiFileText}
                      href="/reports/other"
                      isCollapsed={isCollapsed}
                    >
                      Other Reports
                    </NavItem>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        {SidebarContainer}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box p={0}>
            {SidebarContainer}
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar