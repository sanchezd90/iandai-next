'use client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'


export const StartButton = () => {
    const router = useRouter()
  return (
    <Button variant='outlined' onClick={()=>router.push('/desk')} style={{width:'80%',maxWidth:'350px'}}>Let&apos;s start!</Button>
  )
}
