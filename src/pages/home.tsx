import {
  Box,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Heading,
  Card,
  CardBody,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import { FiUsers, FiActivity, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import { AgCharts } from 'ag-charts-react'

export default function Home() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, blue.50)',
    'linear(to-br, gray.900, blue.900)'
  )

  return (
    <Layout>
      <Box bgGradient={bgGradient} minH="calc(100vh - 120px)" py={6}>
        <Container maxW="container.xl">
          <Box mb={8}>
            <Heading size="lg" mb={2}>Welcome back!</Heading>
            <Text color={textColor}>Here's what's happening with your projects today.</Text>
          </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card 
            bg={cardBg} 
            borderWidth="1px" 
            borderColor={borderColor} 
            shadow="lg"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
          >
            <CardBody>
              <Stat>
                <Box mb={2}>
                  <Icon as={FiUsers} boxSize={6} color="blue.500" />
                </Box>
                <StatLabel fontWeight="medium" color={textColor}>Active Users</StatLabel>
                <StatNumber fontSize="2xl">2,451</StatNumber>
                <StatHelpText color="green.500">
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardBody>
              <Stat>
                <Box mb={2}>
                  <Icon as={FiActivity} boxSize={6} color="green.500" />
                </Box>
                <StatLabel fontWeight="medium">Projects</StatLabel>
                <StatNumber>24</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.5%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardBody>
              <Stat>
                <Box mb={2}>
                  <Icon as={FiDollarSign} boxSize={6} color="purple.500" />
                </Box>
                <StatLabel fontWeight="medium">Revenue</StatLabel>
                <StatNumber>$54.3K</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  4.25%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="sm">
            <CardBody>
              <Stat>
                <Box mb={2}>
                  <Icon as={FiCheckCircle} boxSize={6} color="orange.500" />
                </Box>
                <StatLabel fontWeight="medium">Completed Tasks</StatLabel>
                <StatNumber>145</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  28.5%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="sm" gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <CardBody>
              <AgCharts
                options={{                
                  data: [
                    { month: 'Jan', value: 30 },
                    { month: 'Feb', value: 45 },
                    { month: 'Mar', value: 40 },
                    { month: 'Apr', value: 60 },
                    { month: 'May', value: 80 },
                    { month: 'Jun', value: 70 },
                    { month: 'Jul', value: 90 },
                    { month: 'Aug', value: 100 },
                    { month: 'Sep', value: 110 },
                    { month: 'Oct', value: 130 },
                    { month: 'Nov', value: 120 },
                    { month: 'Dec', value: 150 },
                  ],
                  series: [
                    {
                      type: 'bar',
                      xKey: 'month',
                      yKey: 'value',
                      stroke: '#3182CE',
                      fill: '#63B3ED',
                    },
                  ]
                }}
              />
            </CardBody>
          </Card> 

          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="sm" gridColumn={{ base: 'span 1', lg: 'span 2' }}>
            <CardBody>
              <AgCharts
                options={{                
                  data: [
                    { asset: "Stocks", amount: 60000 },
                    { asset: "Bonds", amount: 40000 },
                    { asset: "Cash", amount: 7000 },
                    { asset: "Real Estate", amount: 5000 },
                    { asset: "Commodities", amount: 3000 }
                  ],
                    title: {
                      text: "Portfolio Composition",
                    },
                    series: [
                      {
                        type: "pie",
                        angleKey: "amount",
                        legendItemKey: "asset",
                      },
                    ],
                }}
              />
            </CardBody>
          </Card> 
        </SimpleGrid>

        {/* Add more dashboard content here if needed */}
      </Container>
      </Box>
    </Layout>
  )
}