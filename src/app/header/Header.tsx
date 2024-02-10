// Header.jsx
'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, useMediaQuery } from '@mui/material';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LanguageSelect } from './LanguageSelect';
import LoginLogoutButton from '../components/LoginLogoutButton';

// Import SVG flag icons

export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);
  const router = useRouter();
  const isSmallScreen = useMediaQuery((theme: any) =>
  theme.breakpoints.down("tablet")
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
          <Box style={{marginLeft: 'auto'}} display={'flex'} zIndex={2} gap={2}>
            <LoginLogoutButton/>
            <Box display={'flex'} alignItems={'center'}>
              <Typography variant='h6'>{!isSmallScreen && 'Practice:'} {selectedLanguage?.name}</Typography>
              <LanguageSelect/>
            </Box>
          </Box>          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
