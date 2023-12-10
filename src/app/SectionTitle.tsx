import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const SectionTitle = ({ title, description }:{title:string,description:string}) => {
  const sectionTitleContainerStyle = {
    textAlign: 'center',
  };

  const titleFrameStyle = {
    border: '2px solid black',
    padding: '10px',
    margin: '20px auto',
  };

  const descriptionStyle = {
    color: 'black',
  };

  return (
    <Box marginBottom={2}>
      <Box style={titleFrameStyle}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box display={'flex'} gap={1}>
        <Image src='/logo-solid.svg' alt='logo' width={25} height={22}/>       
        <Typography variant="body1" style={descriptionStyle}>
            {description}
        </Typography>
      </Box>
    </Box>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SectionTitle;
