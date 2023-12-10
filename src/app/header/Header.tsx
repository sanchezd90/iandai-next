// Header.jsx
'use client'
import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';

// Import SVG flag icons

export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IAndAI
          </Typography>
          <div className="d-flex align-items-center">
            {selectedLanguage && (
              <>
                <img
                  src={`https://flagsapi.com/${selectedLanguage.code}/shiny/64.png`}
                  alt={selectedLanguage.name}
                  className="mr-2"
                  width="30"
                  height="20"
                />
                <div>{selectedLanguage.name}</div>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
