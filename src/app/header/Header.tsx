// Header.jsx
'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';
import Image from 'next/image';

// Import SVG flag icons

export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);

  return (
    <AppBar position="static" color='transparent'>
      <Container>
        <Toolbar>
          <Image src='/logo-solid.svg' alt='logo' width={35} height={30}/>
          <Image src='/logo-words.svg' alt='logo' width={100} height={25}/>
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
