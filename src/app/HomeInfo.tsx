"use client";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";

export const HomeInfo = () => {
  const isExtraSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("mobile")
  );
  return (
    <div>
      {!isExtraSmallScreen && (
        <Typography variant="h4" textAlign={"center"}>
          Introducing <span style={{ fontWeight: 600 }}>IAndAI</span>: Your
          Ultimate Language Learning Companion
        </Typography>
      )}
      {isExtraSmallScreen ?<>
        <Typography
        variant="h5"
        marginTop={6}
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        Choose a topic from our diverse list and engage in a dynamic conversation with <span style={{ fontWeight: 600 }}>IAndAI</span>.  It helps you with grammar and spelling, so you can practice talking without needing another person. Learn languages on your own, get better at talking, and have fun!        
      </Typography>
      </>:<Typography
        variant="h5"
        marginTop={6}
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        Choose a topic from our diverse list and engage in a dynamic conversation with <span style={{ fontWeight: 600 }}>IAndAI</span>.  It helps you with grammar and spelling, so you can practice talking without needing another person. Learn languages on your own, get better at talking, and have fun!
      </Typography>}
    </div>
  );
};
