import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react'
import { HamburgerIcon, BellIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
interface HeaderProps {
  onShowSidebar: () => void
  showSidebarButton?: boolean
  isCollapsed?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar, isCollapsed }: HeaderProps) => {
  const bg = 'gray.800'
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const router = useRouter()
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w={{ 
        base: "full", 
        md: isCollapsed ? "calc(100% - 60px)" : "calc(100% - 240px)" 
      }}
      ml={{ 
        base: 0, 
        md: isCollapsed ? "60px" : "240px" 
      }}
      px={4}
      bg={bg}
      borderBottomWidth="1px"
      borderColor={borderColor}
      h="14"
      position="fixed"
      top={0}
      zIndex="sticky"
      transition="all .3s ease"
    >
      <Flex align="center">
        {showSidebarButton && (
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Menu"
            icon={<HamburgerIcon />}
            onClick={onShowSidebar}
            variant="ghost"
            size="md"
            mr={2}
          />
        )}
        <Text fontSize="lg" fontWeight="bold">
          IPS UI
        </Text>
      </Flex>

      <HStack spacing={4}>
        <Menu>
          <MenuButton>
            <Avatar size="sm" name="User Name" src="/placeholder-avatar.jpg" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => {router.push('/change_password')}}>Change Password</MenuItem>
            <MenuItem onClick={() => {router.push('/login')}}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

    </Flex>
  )
}

export default Header