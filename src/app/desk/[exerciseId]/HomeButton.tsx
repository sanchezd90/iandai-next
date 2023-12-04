'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export const HomeButton = () => {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.push('/')}>
          Home
        </button>
      )
}
