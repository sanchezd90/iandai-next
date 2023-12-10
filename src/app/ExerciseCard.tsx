'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Exercise } from '@/lib/slices/exercises/exercisesSlice'
import { Button, Card} from 'react-bootstrap';

export const ExerciseCard = ({exercise}:{exercise:Exercise}) => {
    const router = useRouter()
    return (
                
          <Card>
                <Card.Body>
                  <Card.Title>{exercise.name}</Card.Title>
                  <Card.Text>{exercise.instructions}</Card.Text>
                  <Button variant="primary" onClick={() => router.push(`/desk/${exercise._id}`)}>Select Exercise</Button>
                </Card.Body>
              </Card>
        
      )
}
