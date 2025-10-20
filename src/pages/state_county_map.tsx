import { Box, Heading } from '@chakra-ui/react'
import Layout from '../components/layout/Layout'
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { useState } from 'react'

export default function StateCountyMap() {
    const geoUrl =
        'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
    const stateColors: Record<string, string> = {
        Alabama: '#fbb4ae',
        Alaska: '#b3cde3',
        Arizona: '#ccebc5',
        Arkansas: '#decbe4',
        California: '#fed9a6',
        Colorado: '#ffffcc',
        Connecticut: '#e5d8bd',
        Delaware: '#fddaec',
        Florida: '#f2f2f2',
        Georgia: '#b3e2cd',
        // ... add all 50 states or generate randomly
    };
    return (
        <Layout>
            <Box p={6} minH="calc(100vh - 120px)">
                <Heading>State/County Map</Heading>
                

      <ComposableMap
        projection="geoAlbersUsa"
        width={980}
        height={600}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const fillColor = stateColors[stateName] || '#DDD';
            
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFF"
                  strokeWidth={0.5}                
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: '#ffa726',
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      </Box>
    </Layout>
  )
}