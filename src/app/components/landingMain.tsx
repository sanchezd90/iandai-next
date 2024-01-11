import { Player } from '@lottiefiles/react-lottie-player';
import LandingMain from '../../../public/resources/chat.json'
import { Box } from '@mui/material';

export const LandingMainAnimation = ({size=520}) => {
  return (
    <Box position={'relative'} style={{width:`${size}px`}}>      
      <Player
          src={LandingMain}
          autoplay
          loop          
      />  
    </Box>  
    )
};
