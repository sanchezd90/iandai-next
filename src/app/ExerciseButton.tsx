'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export const ExerciseButton = () => {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.push('/desk/1')}>
          Exercise 1
        </button>
      )
}
