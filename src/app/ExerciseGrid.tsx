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
import food from 'public/images/buttons/food.jpg';
import artist from 'public/images/buttons/artist.jpg';
import book from 'public/images/buttons/book.jpg';
import city from 'public/images/buttons/city.jpg';
import movie from 'public/images/buttons/movie.jpg';
import political_subject from 'public/images/buttons/political_subject.jpg';
import errands from 'public/images/buttons/errands.jpg';
import partner from 'public/images/buttons/partner.jpg';
import friends from 'public/images/buttons/friends.jpg';
import restaurant from 'public/images/buttons/restaurant.jpg';
import dating from 'public/images/buttons/dating.jpg';
import healthCare from 'public/images/buttons/health-care.jpg';
import shopping from 'public/images/buttons/shopping.jpg';
import domestic from 'public/images/buttons/domestic.jpg';
import work from 'public/images/buttons/work.jpg';
import objects from 'public/images/buttons/objects.jpg';
import feelings from 'public/images/buttons/feelings.jpg';
import directions from 'public/images/buttons/directions.jpg';
import places from 'public/images/buttons/places.jpg';
import traits from 'public/images/buttons/traits.jpg';
import payments from 'public/images/buttons/payments.jpg';
import groceryShopping from 'public/images/buttons/grocery-shopping.jpg';
import commuting from 'public/images/buttons/commuting.jpg';
import phoneUsage from 'public/images/buttons/phone-usage.jpg';
import cooking from 'public/images/buttons/cooking.jpg';
import morningRoutine from 'public/images/buttons/morning-routine.jpg';



export const ExerciseGrid = ({activity}:{activity:Activity}) => {  
  const router = useRouter()  
  const { selectedLanguage } = useSelector(selectLanguages);
  const isSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('tablet'));
  const isExtraSmallScreen = useMediaQuery((theme:any) => theme.breakpoints.down('mobile'));

  const images = {
    "Food": food,
    "Artist": artist,
    "Book": book,
    "City": city,
    "Movie": movie,
    "Political Subject": political_subject,
    "Errands": errands,
    "Partner": partner,
    "Friends": friends,
    "Restaurant": restaurant,
    "Dating": dating,
    "Health Care": healthCare,
    "Shopping": shopping,
    "Domestic": domestic,
    "Work": work,
    "Objects": objects,
    "Feelings": feelings,
    "Directions": directions,
    "Places": places,
    "Traits": traits,
    "Payments": payments,
    "Grocery shopping": groceryShopping,
    "Commuting": commuting,
    "Phone usage": phoneUsage,
    "Cooking": cooking,
    "Morning routine": morningRoutine,
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
          <ImageSrc style={{ backgroundImage: `url(${images[exercise.name]?.src})`}} />
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
