'use client'
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AuthUserObject } from '@/interfaces/auth';
import { useRouter } from 'next/navigation';
import { dispatch } from '@/lib/store';
import { getJwt } from '@/lib/slices/auth/authSlice';

const LoginLogoutButton = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const typedSession = session as AuthUserObject;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    router.push('/profile')
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(typedSession){
      dispatch(getJwt(typedSession))
    }
  }, [typedSession])
  

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
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
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
