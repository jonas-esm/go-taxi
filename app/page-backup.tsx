'use client'
import React from 'react'

import { Container, Stack } from '@mui/material'

import MyAppBar from '@/components/home/AppBar'
import Footer from '@/components/home/footer'
import HeroSection from '@/components/home/hero'
import InfoSection from '@/components/home/info-cards'
import { TripReserveForm } from '@/components/home/reserve-form'

function Page() {
  return (
    <Container maxWidth='sm' sx={{ position: 'relative' }}>
      <MyAppBar />
      <Stack spacing={6} mt={2}>
        <HeroSection />
        <TripReserveForm />
        <InfoSection />
        <Footer />
      </Stack>
    </Container>
  )
}

export default Page
