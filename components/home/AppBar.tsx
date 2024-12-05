'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { AppBar, Box, Toolbar, useScrollTrigger } from '@mui/material'

import LogoSvg from '../../assets/logo.svg'
import ChangeLangualge from '../shared/change-language'

function ElevationScroll(props: any) {
  const { children, window } = props

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return children
    ? React.cloneElement(children, {
        //   elevation: trigger ? 4 : 0,
        style: {
          boxShadow: trigger ? '4px 4px 8px #c9c9c96c' : undefined
        }
      })
    : null
}

function MyAppBar() {
  const [windowState, setWindowState] = useState<Window | null>(null)

  useEffect(() => {
    if (window) {
      setWindowState(window)
    }
  }, [])

  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            background: '#fff',
            boxShadow: windowState ? (windowState?.scrollY > 10 ? '4px 4px 8px #c9c9c96c' : undefined) : undefined
          }}
        >
          <Toolbar>
            <Box mx='auto'>
              <Image src={LogoSvg} alt='logo' />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                right: 10,
                color: '#000'
              }}
            >
              <ChangeLangualge />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>

    // <Box
    //     sx={{
    //         width: "100%",
    //         display: "flex",
    //         mx: -2,
    //         alignItems: "center",
    //         py: 1.5,
    //         borderBottom: "1px solid #E1E1E1",
    //         position: "fixed",
    //         background: "#fff",
    //         // filter: "blur(10px)",
    //         boxShadow: "1px 1px 10px #e1e1e115 ",
    //         px: 2,
    //     }}
    // >
    //     <Box mx="auto">
    //         <Image src={LogoSvg} alt="logo" />
    //     </Box>
    //     {/* <Box ml="auto">
    //         <Icon icon="ph:globe" width={24} /> */}
    //     {/* </Box> */}
    // </Box>
  )
}

export default MyAppBar
