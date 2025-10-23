import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  Checkbox,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  useToast,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '../components/layout/Layout';

// Predefined reports list
const AVAILABLE_REPORTS = [
  'User Management Report',
  'Sales Report',
  'Revenue Report',
  'Performance Analytics',
  'Customer Insights',
  'Inventory Report',
  'Financial Summary',
  'Audit Logs',
  'Activity Report',
  'Compliance Report',
  'Export Data',
  'State/County Map',
];

// Default roles with their permissions
const DEFAULT_ROLES = {
  Admin: AVAILABLE_REPORTS, // Admin has all permissions
  Manager: [
    'Sales Report',
    'Revenue Report',
    'Performance Analytics',
    'Customer Insights',
    'Inventory Report',
    'State/County Map',
  ],
  Member: [
    'Sales Report',
    'Customer Insights',
    'State/County Map',
  ],
};

interface RolePermissions {
  [roleName: string]: string[];
}

export default function Permissions() {
  const [roles, setRoles] = useState<RolePermissions>(DEFAULT_ROLES);
  const [selectedRole, setSelectedRole] = useState<string>('Admin');
  const [newRoleName, setNewRoleName] = useState<string>('');
  const [isCreatingRole, setIsCreatingRole] = useState<boolean>(false);
  const toast = useToast();

  // Get permissions for the selected role
  const currentPermissions = roles[selectedRole] || [];

  // Handle checkbox toggle
  const handleReportToggle = (reportName: string) => {
    const updatedPermissions = currentPermissions.includes(reportName)
      ? currentPermissions.filter((r) => r !== reportName)
      : [...currentPermissions, reportName];

    setRoles({
      ...roles,
      [selectedRole]: updatedPermissions,
    });
  };

  // Create a new custom role
  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a role name',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (roles[newRoleName]) {
      toast({
        title: 'Error',
        description: 'Role already exists',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setRoles({
      ...roles,
      [newRoleName]: [],
    });
    setSelectedRole(newRoleName);
    setNewRoleName('');
    setIsCreatingRole(false);

    toast({
      title: 'Success',
      description: `Role "${newRoleName}" created successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Delete a custom role
  const handleDeleteRole = (roleName: string) => {
    if (['Admin', 'Manager', 'Member'].includes(roleName)) {
      toast({
        title: 'Error',
        description: 'Cannot delete default roles',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedRoles = { ...roles };
    delete updatedRoles[roleName];
    setRoles(updatedRoles);
    setSelectedRole('Admin');

    toast({
      title: 'Success',
      description: `Role "${roleName}" deleted successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Save permissions
  const handleSavePermissions = () => {
    // Here you would typically send the data to your backend
    console.log('Saving permissions:', roles);

    toast({
      title: 'Success',
      description: 'Permissions saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Select all reports
  const handleSelectAll = () => {
    setRoles({
      ...roles,
      [selectedRole]: [...AVAILABLE_REPORTS],
    });
  };

  // Deselect all reports
  const handleDeselectAll = () => {
    setRoles({
      ...roles,
      [selectedRole]: [],
    });
  };

  const isDefaultRole = ['Admin', 'Manager', 'Member'].includes(selectedRole);

  return (
    <Layout>
      <Box p={6} minH="calc(100vh - 120px)">
        <Heading mb={6}>Role Permissions Management</Heading>

        <VStack spacing={6} align="stretch">
          {/* Role Selection Section */}
          <Card>
            <CardHeader>
              <Heading size="md">Select Role</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <FormControl flex={1}>
                    <FormLabel>Choose Role</FormLabel>
                    <Select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {Object.keys(roles).map((roleName) => (
                        <option key={roleName} value={roleName}>
                          {roleName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  {!isDefaultRole && (
                    <IconButton
                      aria-label="Delete role"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      mt={8}
                      onClick={() => handleDeleteRole(selectedRole)}
                    />
                  )}
                </HStack>

                <Divider />

                {/* Create New Role */}
                {!isCreatingRole ? (
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => setIsCreatingRole(true)}
                  >
                    Create Custom Role
                  </Button>
                ) : (
                  <HStack spacing={4}>
                    <Input
                      placeholder="Enter new role name"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleCreateRole();
                      }}
                    />
                    <Button colorScheme="green" onClick={handleCreateRole}>
                      Create
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsCreatingRole(false);
                        setNewRoleName('');
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Report Permissions Section */}
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">
                  Assign Reports to {selectedRole}
                </Heading>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAll}
                  >
                    Select All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDeselectAll}
                  >
                    Deselect All
                  </Button>
                </HStack>
              </HStack>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {AVAILABLE_REPORTS.map((report) => (
                  <Checkbox
                    key={report}
                    isChecked={currentPermissions.includes(report)}
                    onChange={() => handleReportToggle(report)}
                    colorScheme="blue"
                  >
                    {report}
                  </Checkbox>
                ))}
              </SimpleGrid>

              <Box mt={6}>
                <Text fontSize="sm" color="gray.600">
                  Selected: {currentPermissions.length} of{' '}
                  {AVAILABLE_REPORTS.length} reports
                </Text>
              </Box>
            </CardBody>
          </Card>

          {/* Save Button */}
          <HStack justify="flex-end">
            <Button colorScheme="blue" size="lg" onClick={handleSavePermissions}>
              Save Permissions
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Layout>
  );
}
