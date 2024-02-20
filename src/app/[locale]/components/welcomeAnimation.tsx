'use client'
import { Player } from '@lottiefiles/react-lottie-player';
import Welcome from '../../../../public/resources/welcome.json'
import { useEffect, useRef } from 'react';

export const WelcomeAnimation = () => {
    const playerRef = useRef(null)
    useEffect(() => {
      
    }, [])
    
  return (  
    <Player
        ref={playerRef}
        src={Welcome}
        autoplay
        loop
        style={{width:'12rem'}}        
    />  
    )
};
