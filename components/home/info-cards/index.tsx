import React from 'react'

import { Box } from '@mui/material'

import { useTranslations } from 'next-intl'

import InfoCardComponent from './info-card'
import { informationCardsData } from './cards-data'

function InfoSection() {
  const t = useTranslations()

  return (
    <Box mb={6}>
      {informationCardsData(t).map((item, key) => (
        <InfoCardComponent key={key} {...item} />
      ))}
    </Box>
  )
}

export default InfoSection
