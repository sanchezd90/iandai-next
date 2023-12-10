// Home.jsx
import React from 'react';
import { ExerciseGrid } from './ExerciseGrid';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS

export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Main Menu</h1>
      <ExerciseGrid />
    </div>
  );
}
