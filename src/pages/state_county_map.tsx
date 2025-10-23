import { Box, Heading, Text, Select, FormControl, FormLabel, HStack } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { useState } from 'react'
import { Tooltip } from 'react-tooltip';
import { geoCentroid } from 'd3-geo';

export default function StateCountyMap() {
  const [selectedState, setSelectedState] = useState('06'); // California FIPS code
  
  // Use reliable US Atlas TopoJSON
  const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
  
  // State configurations with FIPS codes
  const stateConfigs: Record<string, {
    name: string;
    fipsCode: string;
    center: [number, number];
    scale: number;
  }> = {
    '06': {
      name: 'California',
      fipsCode: '06',
      center: [-119.5, 37],
      scale: 3
    },
    '48': {
      name: 'Texas',
      fipsCode: '48',
      center: [-99.9, 31.5],
      scale: 2.5
    },
    '12': {
      name: 'Florida',
      fipsCode: '12',
      center: [-81.5, 28.5],
      scale: 4
    },
    '36': {
      name: 'New York',
      fipsCode: '36',
      center: [-75.5, 43],
      scale: 4.5
    },
    '17': {
      name: 'Illinois',
      fipsCode: '17',
      center: [-89.5, 40],
      scale: 4.5
    },
    '42': {
      name: 'Pennsylvania',
      fipsCode: '42',
      center: [-77.5, 41],
      scale: 5
    },
    '39': {
      name: 'Ohio',
      fipsCode: '39',
      center: [-82.5, 40.5],
      scale: 5.5
    },
    '13': {
      name: 'Georgia',
      fipsCode: '13',
      center: [-83.5, 32.5],
      scale: 4.5
    },
    '37': {
      name: 'North Carolina',
      fipsCode: '37',
      center: [-79.5, 35.5],
      scale: 4.5
    },
    '26': {
      name: 'Michigan',
      fipsCode: '26',
      center: [-85, 44.5],
      scale: 3.5
    },
  };

  const currentConfig = stateConfigs[selectedState];
  
  // Sample population data for California counties (you can update with real data)
  const countyPopulation: Record<string, number> = {
    'Los Angeles': 10014009,
    'San Diego': 3298634,
    'Orange': 3186989,
    'Riverside': 2470546,
    'San Bernardino': 2180085,
    'Santa Clara': 1936259,
    'Alameda': 1671329,
    'Sacramento': 1585055,
    'Contra Costa': 1153526,
    'Fresno': 1008654,
    'Kern': 909235,
    'San Francisco': 873965,
    'Ventura': 846006,
    'San Mateo': 766573,
    'San Joaquin': 779233,
    'Stanislaus': 552878,
    'Sonoma': 488863,
    'Tulare': 473117,
    'Solano': 453491,
    'Santa Barbara': 448229,
    'Monterey': 434861,
    'Placer': 404739,
    'San Luis Obispo': 283111,
    'Santa Cruz': 270861,
    'Merced': 286461,
    'Marin': 262321,
    'Butte': 219186,
    'Yolo': 220500,
    'El Dorado': 192843,
    'Imperial': 181215,
    'Shasta': 182155,
    'Madera': 157327,
    'Kings': 152940,
    'Napa': 137744,
    'Humboldt': 135558,
    'Nevada': 102241,
    'Sutter': 99633,
    'Mendocino': 91305,
    'Yuba': 81575,
    'Lake': 68163,
    'Tehama': 65498,
    'San Benito': 64209,
    'Tuolumne': 54478,
    'Calaveras': 45905,
    'Siskiyou': 44118,
    'Amador': 40474,
    'Lassen': 32730,
    'Glenn': 28805,
    'Del Norte': 27743,
    'Colusa': 21917,
    'Plumas': 19915,
    'Inyo': 19016,
    'Mariposa': 17131,
    'Mono': 14444,
    'Trinity': 16060,
    'Modoc': 8700,
    'Sierra': 3236,
    'Alpine': 1235,
  };

  const formatPopulation = (pop: number) => {
    return pop.toLocaleString();
  };

  const [tooltipContent, setTooltipContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  return (
    <Layout>
      <Box p={2}>
        <Heading mb={4}>US State Counties Map</Heading>
        
        {/* State Selection Dropdown */}
        <HStack spacing={4} mb= {2}>
          <FormControl maxW="400px">
            <FormLabel>Select State</FormLabel>
            <Select 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              size="lg"
            >
              {Object.entries(stateConfigs).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <Text color="gray.600" mb = {2}>
          Showing {currentConfig.name} - Hover over counties to see population data
        </Text>
        {error && (
          <Text color="red.500" mb={4}>
            Error loading map: {error}
          </Text>
        )}
       
        
      </Box>
         <ComposableMap
            projection="geoAlbersUsa"
            
          >
            <ZoomableGroup
              center={currentConfig.center}
              zoom={currentConfig.scale}
            >
            <Geographies 
              geography={geoUrl}
              onError={(error) => {
                console.error('Error loading geography:', error);
                setError("Failed to load map data.");
                setIsLoading(false);
              }}
            >
              {({ geographies }) => {
                if (geographies.length > 0) {
                  setIsLoading(false);
                }
                // Filter counties by state FIPS code (first 2 digits of county ID)
                const stateGeographies = geographies.filter((geo) => {
                  const id = geo.id || '';
                  return id.startsWith(currentConfig.fipsCode);
                });
                
                return (
                  <>
                    {stateGeographies.map((geo) => {
                      const countyName = geo.properties.name || geo.properties.NAME;
                      const population = countyPopulation[countyName];
                      const tooltipText = population
                        ? `${countyName}: ${formatPopulation(population)}`
                        : countyName || 'Unknown';

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-tooltip-id="county-tooltip"
                          data-tooltip-content={tooltipText}
                          onMouseEnter={() => {
                            setTooltipContent(tooltipText);
                          }}
                          onMouseLeave={() => {
                            setTooltipContent("");
                          }}
                          style={{
                            default: {
                              fill: "#DDD",
                              stroke: "#FFF",
                              strokeWidth: 0.75,
                              outline: "none"
                            },
                            hover: {
                              fill: "#4A90E2",
                              stroke: "#FFF",
                              strokeWidth: 1,
                              outline: "none"
                            },
                            pressed: {
                              fill: "#2E5C8A",
                              stroke: "#FFF",
                              strokeWidth: 1,
                              outline: "none"
                            }
                          }}
                        />
                      );
                    })}
                    {stateGeographies.map((geo) => {
                      const centroid = geoCentroid(geo);
                      const countyName = geo.properties.name || geo.properties.NAME;
                      
                      return (
                        <g key={geo.rsmKey + "-name"}>
                          <Marker coordinates={centroid}>
                            <text
                              textAnchor="middle"
                              style={{
                                fontFamily: "system-ui",
                                fill: "#333",
                                fontSize: "2px",
                                fontWeight: "500",
                                pointerEvents: "none"
                              }}
                            >
                              {countyName}
                            </text>
                          </Marker>
                        </g>
                      );
                    })}
                  </>
                );
              }}
            </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          {isLoading && (
            <Text textAlign="center" mt={4}>
              Loading map data...
            </Text>
          )}
          <Tooltip id="county-tooltip" style={{ backgroundColor: "#333", color: "#fff", padding: "8px 12px", borderRadius: "4px", fontSize: "14px" }} />
    </Layout>
  );
}