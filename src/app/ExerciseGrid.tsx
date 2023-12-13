// ExerciseGrid.jsx
'use client'
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  getExerciseList,
  selectExercises,
} from '@/lib/slices/exercises/exercisesSlice';
import { useDispatch, useSelector } from '../../src/lib/store';
import {
  selectLanguages,
  getLanguageList,
} from '@/lib/slices/languages/languagesSlice';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/navigation';
import SectionTitle from './SectionTitle';
import Food from 'public/images/buttons/food.jpg'
import Image from 'next/image';

export const ExerciseGrid = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { exercises } = useSelector(selectExercises);
  const { selectedLanguage } = useSelector(selectLanguages);

  useEffect(() => {
    dispatch(getExerciseList());
    dispatch(getLanguageList());
  }, [dispatch]);


const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('mobile')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));


const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageX = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const handleClick = (id:string) => {
  router.push(`/desk/${id}`)
};

  return (
    <section>
      <SectionTitle title='Brief Discussions' description='IAndAI will ask you an open question about a topic you choose. Then it will give you feedback on your answer'/>      
      <Image src={Food} alt=''/>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {selectedLanguage && exercises.map((exercise) => (
        <ImageButton
          focusRipple
          key={exercise._id}
          style={{
            width: '33.33%',
          }}
          onClick={()=>handleClick(exercise._id)}
        >
          <ImageSrc style={{ backgroundImage: `url(/images/buttons/${exercise.name.replace(' ','_')}.jpg)`}} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <ImageX>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {exercise.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </ImageX>
        </ImageButton>
      ))}
    </Box>
    </section>
  );
};
