// Header.jsx
'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import SVG flag icons

export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);
  const router = useRouter()

  return (
    <AppBar position="static" color='transparent'>
      <Container>
        <Toolbar>
          <Box style={{cursor:'pointer'}} onClick={()=>router.push('/desk')}>
            <Image src='/logo-solid.svg' alt='logo' width={35} height={30}/>
          </Box>
          <Box style={{cursor:'pointer'}} onClick={()=>router.push('/desk')}>
            <Image src='/logo-words.svg' alt='logo' width={100} height={25}/>
          </Box>
          <div className="d-flex align-items-center">
            {selectedLanguage && (
              <>
                {/* <img
                  src={`https://flagsapi.com/${selectedLanguage.code}/shiny/64.png`}
                  alt={selectedLanguage.name}
                  className="mr-2"
                  width="30"
                  height="20"
                />
                <div>{selectedLanguage.name}</div> */}
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
