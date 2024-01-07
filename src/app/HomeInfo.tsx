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
        
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        With <span style={{ fontWeight: 600 }}>IAndAI</span> you can practice talking foreign languages without needing another person.
      </Typography>
        <Typography
        variant="h5"
        marginTop={2}
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        Choose an activity from our diverse list and engage in a dynamic conversation with <span style={{ fontWeight: 600 }}>IAndAI</span>.
      </Typography>
      </>:<Typography
        variant="h5"
        marginTop={6}
        textAlign={"center"}
        letterSpacing={0.5}
        lineHeight={1.3}
      >
        <span style={{ fontWeight: 600 }}>IAndAI</span> helps you with grammar and spelling, so you can practice talking without needing another person. Choose an activity from our diverse list and engage in a dynamic conversation with <span style={{ fontWeight: 600 }}>IAndAI</span>. Learn languages on your own, get better at talking, and have fun!
      </Typography>}
    </div>
  );
};
