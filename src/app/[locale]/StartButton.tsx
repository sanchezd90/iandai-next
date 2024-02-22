'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl';

export const StartButton = () => {
    const intl = useIntl();
    const router = useRouter()
  return (
    <Button variant='outlined' onClick={()=>router.push(`${intl.locale}/desk`)} style={{width:'80%',maxWidth:'350px'}}> {intl.formatMessage({ id: 'lets_start' })}</Button>
  )
}
