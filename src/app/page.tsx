import { ExerciseButton } from "./ExerciseButton";
import axios from 'axios';

export default function Home() {  

// Function to fetch data from http://localhost:3001/api/languages endpoint
const getLanguages = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/languages');
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error; // Handle the error as needed
  }
};

// Function to fetch data from http://localhost:3001/api/exercises endpoint
const getExercises = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/exercises');
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; // Handle the error as needed
  }
};

// Example usage in a component or a page

  const fetchData = async () => {
    try {
      const languagesData = await getLanguages();
      const exercisesData = await getExercises();

      // Now you can use languagesData and exercisesData in your component
      console.log('Languages data:', languagesData);
      console.log('Exercises data:', exercisesData);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  // Trigger the data fetching when the component mounts or as needed
  fetchData();

  return (    
      <div>
        <h1>Main Menu</h1>     
        <ExerciseButton/>      
      </div>    
  );
};
