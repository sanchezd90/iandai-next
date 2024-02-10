'use client'
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AuthUserObject } from '@/interfaces/auth';

const LoginLogoutButton = () => {
    const { data: session } = useSession()
    const typedSession = session as AuthUserObject;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {typedSession ? (
        <>
          <Avatar
            alt={typedSession?.user?.name}
            src={typedSession?.user?.image}
            sx={{ cursor: 'pointer' }}
            onClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={()=>signOut()}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button color="inherit" onClick={()=>signIn()}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default LoginLogoutButton;
