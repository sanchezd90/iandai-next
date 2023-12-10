'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'

export const HomeButton = () => {
    const router = useRouter()
    return (
        <Button type="button" onClick={() => router.push('/desk')}>
          Home
        </Button>
      )
}
