// ExerciseGrid.jsx
'use client'
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  Activity,
} from '@/lib/slices/activities/activitiesSlice';
import { useSelector } from '../../src/lib/store';
import {
  selectLanguages  
} from '@/lib/slices/languages/languagesSlice';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/navigation';
import SectionTitle from './SectionTitle';
import Image from 'next/image';

export const ExerciseGrid = ({activity, activityIndex}:{activity:Activity, activityIndex:number}) => {  
  const router = useRouter()  
  const { selectedLanguage } = useSelector(selectLanguages);
  const isSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('tablet'));
  const isExtraSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('mobile'));

  const images = {
    "Food": '/images/buttons/food.jpg',
    "Artist": '/images/buttons/artist.jpg',
    "Book": '/images/buttons/book.jpg',
    "City": '/images/buttons/city.jpg',
    "Movie": '/images/buttons/movie.jpg',
    "Political Subject": '/images/buttons/political_subject.jpg',
    "Errands": '/images/buttons/errands.jpg',
    "Partner": '/images/buttons/partner.jpg',
    "Friends": '/images/buttons/friends.jpg',
    "Restaurant": '/images/buttons/restaurant.jpg',
    "Dating": '/images/buttons/dating.jpg',
    "Health Care": '/images/buttons/health-care.jpg',
    "Shopping": '/images/buttons/shopping.jpg',
    "Domestic": '/images/buttons/domestic.jpg',
    "Work": '/images/buttons/work.jpg',
    "Objects": '/images/buttons/objects.jpg',
    "Feelings": '/images/buttons/feelings.jpg',
    "Directions": '/images/buttons/directions.jpg',
    "Places": '/images/buttons/places.jpg',
    "Traits": '/images/buttons/traits.jpg',
    "Payments": '/images/buttons/payments.jpg',
    "Grocery shopping": '/images/buttons/grocery-shopping.jpg',
    "Commuting": '/images/buttons/commuting.jpg',
    "Phone usage": '/images/buttons/phone-usage.jpg',
    "Cooking": '/images/buttons/cooking.jpg',
    "Morning routine": '/images/buttons/morning-routine.jpg',
    "Your early years": '/images/buttons/your_early_years.jpg',
    "Your hobbies": '/images/buttons/your_hobbies.jpg',
    "Your recent life": '/images/buttons/your_recent_life.jpg',
    "Your hometown": '/images/buttons/your_hometown.jpg',
    "Your profession": '/images/buttons/your_profession.jpg',
    "Your day": '/images/buttons/your_day.jpg',
  } as any;
  

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('mobile')]: {
    width: '100% !important', // Overrides inline-style
    height: 200,
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


const ImageSrc = styled(Image)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  objectFit:'cover'
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
      <SectionTitle title={activity.name} instructions={activity.instructions}/>            
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {selectedLanguage && activity.exercises.map((exercise) => (
        <ImageButton
          focusRipple
          key={exercise._id}
          style={{
            width: isExtraSmallScreen?'100%':isSmallScreen?'50%':'33.33%',
          }}
          onClick={()=>handleClick(exercise._id)}
        >
          <ImageSrc
            src={images[exercise.name]}
            alt={exercise.name}          
            priority={activityIndex===0}
            fill
            sizes={isExtraSmallScreen?'100vw':isSmallScreen?'50vw':'33.33vw'}
          />
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
