'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Exercise } from '@/lib/slices/exercises/exercisesSlice'

export const ExerciseButton = ({exercise}:{exercise:Exercise}) => {
    const router = useRouter()
    return (
        <button type="button" onClick={() => router.push(`/desk/${exercise._id}`)}>
          {exercise.name}
        </button>
      )
}
