"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { LandingMainAnimation } from "./components/landingMain";
import { StartButton } from "./StartButton";
import useWindowSize from "@/hooks/useWindowSize";
import { useIntl } from 'react-intl';

export const HomeInfo = () => {  
  const intl = useIntl();
  const isExtraSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("mobile")
  );
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("tablet")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("laptop")
  );
  const {width} = useWindowSize()
  const animationSize = () => {
    if(!width) return 0
    if(width>1020) return width/3
    if(width>770) return width/2.5
    if(width>480) return width/2
    return width/1.5
  }
  const headerVariant = () => {
    if(!width) return 'h4'
    if(width>1020) return 'h4'
    return 'h5'    
  }
  return (
    <Box display={'flex'} flexDirection={isSmallScreen?'column':'row'} justifyContent={isSmallScreen?'':'space-between'} alignItems={'center'}>
      <Box>
        <LandingMainAnimation size={animationSize()}/>
      </Box>
      <Box width={isSmallScreen?'75%':'30vw'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3}>              
          <Typography
          variant={headerVariant()}
          fontWeight={600}
          marginTop={2}
          textAlign={"center"}
          letterSpacing={0.5}
          lineHeight={1.3}
          style={{opacity:0.9}}
        >
          {intl.formatMessage({ id: 'practice_foreign_language' })}
        </Typography>
        <StartButton/>
      </Box>
    </Box>
  );
};
