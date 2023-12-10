// Header.jsx
'use client'
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { useSelector } from '../../lib/store';

// Import SVG flag icons


export const Header = () => {
  const { selectedLanguage } = useSelector(selectLanguages);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>IAndAI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
