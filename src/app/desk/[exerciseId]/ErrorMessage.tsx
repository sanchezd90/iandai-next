'use client'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Icon } from '@iconify/react';

interface props {
    action:()=>void,
    disabled:boolean
}

export const ErrorMessage = ({action,disabled}:props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <Typography variant='h4' marginY={2}>Sorry!</Typography>
              <Icon icon="bxs:tired" width='6rem'/>
              <Typography marginY={2}><span style={{fontWeight:600}}>IAndAI</span> has had a rough day and failed to generate a proper response.</Typography>
              <Button style={{marginTop:10}} variant="outlined" color="primary" onClick={action} disabled={disabled}>
                  Try again
                </Button>
            </Box>
  )
}
