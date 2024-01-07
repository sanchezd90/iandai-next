import { Player } from '@lottiefiles/react-lottie-player';
import LandingMain from '../../../public/resources/landingMain.json'
import { Box } from '@mui/material';
import Image from 'next/image';

export const LandingMainAnimation = ({size=520}) => {
  return (
    <Box position={'relative'} style={{width:`${size}px`}}>
      <Image src='/logo-solid.svg' alt='logo' width={size/5} height={size/5} style={{position:'absolute',left:size/2-size/10,top:size/2-size/10}}/>
      <Player
          src={LandingMain}
          autoplay
          loop          
      />  
    </Box>  
    )
};
