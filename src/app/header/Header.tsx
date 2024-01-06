// Header.jsx
'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, useMediaQuery } from '@mui/material';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LanguageSelect } from './LanguageSelect';

// Import SVG flag icons

export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);
  const router = useRouter();
  const isExtraSmallScreen = useMediaQuery((theme: any) =>
  theme.breakpoints.down("mobile")
);

  return (
    <AppBar position="static" color='transparent'>
      <Container>
        <Toolbar>          
          <Box style={{cursor:'pointer'}} onClick={()=>router.push('/')}>
            <Image src='/logo-solid.svg' alt='logo' width={35} height={30}/>
          </Box>
          <Box style={{cursor:'pointer'}} onClick={()=>router.push('/')}>
            <Image src='/logo-words.svg' alt='logo' width={100} height={25}/>
          </Box>
          <Box style={{marginLeft: 'auto'}} display={'flex'} alignItems={'center'} zIndex={2}>
            <Typography variant='h6'>{!isExtraSmallScreen && 'Practice:'} {selectedLanguage?.name}</Typography>
            <LanguageSelect/>
          </Box>          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
