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
        Unlock the power of seamless language practice with{" "}
        <span style={{ fontWeight: 600 }}>IAndAI</span>, the innovative app
        designed to elevate your{" "}
        <span style={{ fontWeight: 600 }}>conversation and writing skills</span>.        
      </Typography>
      </>:<Typography
        variant="h5"
        marginTop={6}
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        Unlock the power of seamless language practice with{" "}
        <span style={{ fontWeight: 600 }}>IAndAI</span>, the innovative app
        designed to elevate your{" "}
        <span style={{ fontWeight: 600 }}>conversation and writing skills</span>
        . Whether you&apos;re a beginner or aiming for fluency, our AI chat is
        here to guide you through dynamic interactions, making language learning
        a breeze.
      </Typography>}
    </div>
  );
};
