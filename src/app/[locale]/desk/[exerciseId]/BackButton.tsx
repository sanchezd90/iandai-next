'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export const BackButton = () => {
    const router = useRouter();
  return (
    <Box
              display='inline-flex'
              justifyContent={'left'}
              alignItems={'center'}
              gap={1}
              marginTop={3}
              sx={{ cursor: 'pointer' }}
              onClick={() => router.back()}
              data-cy='routerBox'
              >
              <Icon icon={'ph:arrow-left-bold'} width={'1rem'} height={'1rem'} color={'black'} />
              <Typography
                sx={{
                  fontStyle: 'normal',                
                  fontFamily: '"ArialBold", Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'black',
                  justifyContent: 'center',
                  
                }}
                data-cy='backToText'
                >
                Go back
              </Typography>
            </Box>
  )
}
