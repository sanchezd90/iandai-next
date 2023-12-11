import React from 'react';
import {Box,Typography} from '@mui/material';
import Image from 'next/image';
import { StartButton } from './StartButton';


export default function Home() {  
  return (
    <Box marginTop={6}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Image src='/logo-solid.svg' alt='logo' width={235} height={230}/>
          <Image src='/logo-words.svg' alt='logo' width={100} height={25}/>
      </Box>    
      <Box marginY={6}>
        <Typography variant='h4' textAlign={'center'}>
          Introducing <span style={{fontWeight:600}}>IAndAI</span>: Your Ultimate Language Learning Companion
        </Typography>        
        <Typography variant='h5' marginTop={6}  textAlign={'center'} letterSpacing={0.5} lineHeight={1.3}>
          Unlock the power of seamless language practice with <span style={{fontWeight:600}}>IAndAI</span>, the innovative app designed to elevate your <span style={{fontWeight:600}}>conversation and writing skills</span>. Whether you&apos;re a beginner or aiming for fluency, our AI chat is here to guide you through dynamic interactions, making language learning a breeze.
        </Typography>
        </Box>             
      <Box marginY={6} display={'flex'} justifyContent={'center'}>
        <StartButton/>
      </Box>
    </Box>
  );
}
