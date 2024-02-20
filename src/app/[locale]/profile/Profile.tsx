'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material';
import { getChatList, selectChats } from '@/lib/slices/chats/chatsSlice';  // Import your chat-related functions from the appropriate location
import { dispatch, useSelector } from '@/lib/store';
import { selectAuth } from '@/lib/slices/auth/authSlice';

export const Profile = () => {    
    const { user } = useSelector(selectAuth);
    const { chats, loading } = useSelector(selectChats);

    useEffect(() => {        
        if(user){
            dispatch(getChatList(user.jwt))
        }
    }, [user]);

    return (
        <Box marginTop={8} position={'relative'}>
            <Box display='flex' position='absolute' left='50%' top='50%' zIndex={-1} sx={{ transform: 'translate(-50%, -50%)', opacity: loading ? '1' : '0', transition: 'opacity 0.5s ease-in, opacity 0.1s ease-out' }}>
                <CircularProgress />
            </Box>
            <Box marginY={6} sx={{ opacity: loading ? '0' : '1', transition: 'opacity 0.5s ease-in, opacity 0.25s ease-out' }}>
                {!loading && chats.map((chat, index) => (
                    // Render your chat items here
                    <div key={index}>{chat.exerciseId}</div>
                ))}
            </Box>
        </Box>
    )
}
