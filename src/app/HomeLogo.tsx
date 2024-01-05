'use client'
import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Image from 'next/image';

export const HomeLogo = () => {
  const isSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('tablet'));

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Image src='/logo-solid.svg' alt='logo' width={isSmallScreen ? 120 : 150} height={isSmallScreen ? 120 : 150} />
        <Image src='/logo-words.svg' alt='logo' width={isSmallScreen ? 60 : 80} height={isSmallScreen ? 15 : 20} />
      </Box>
  )
}
