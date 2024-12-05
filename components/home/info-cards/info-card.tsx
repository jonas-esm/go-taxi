import { Avatar, Box, Card, Typography, useTheme } from '@mui/material'

import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import React from 'react'

const MissionImage = require('/assets/about_us.png')

function InfoCardComponent({
  details,
  imageSource,
  title
}: {
  title: string
  details: string
  imageSource: string | StaticImport
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'visible',
        my: 32
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: '50%',
          transform: 'translateX(50%)',
          zIndex: -1
        }}
      >
        <Avatar
          sx={{
            width: 130,
            height: 130,
            background: '#fff',

            // boxShadow: "0px 4px 12px 0px #00000024",
            border: '1px solid #c0c0c0',
            zIndex: -1
          }}
        >
          <div />
        </Avatar>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -106,
          right: '50%',
          transform: 'translateX(50%)',
          zIndex: -2
        }}
      >
        <Avatar
          sx={{
            width: 178,
            height: 178,
            background: '#fff',

            // boxShadow: "0px 4px 12px 0px #00000024",
            border: '1px solid #dfdfdf',
            zIndex: -2
          }}
        >
          <div />
        </Avatar>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -56,
          right: '50%',
          transform: 'translateX(50%)'
        }}
      >
        <Avatar
          sx={{
            width: 82,
            height: 82,
            background: '#fff',
            boxShadow: '0px 4px 12px 0px #00000024'
          }}
        >
          <Image src={imageSource} alt={title} />
        </Avatar>
      </Box>
      <Card
        sx={{
          background: '#F7F8FA',
          overflow: 'visible',
          mt: 20,
          zIndex: 999999999
        }}
      >
        <Box px={6} py={8.5}>
          <Typography fontWeight={700} mb={2} textAlign={'center'}>
            {title}
          </Typography>
          <Typography textAlign={'center'}>{details} </Typography>
        </Box>
      </Card>
    </Box>
  )
}

export default InfoCardComponent
