"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from "../hooks"; 
import { saveId } from "../features/counter/counter-slice";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { useRouter } from 'next/navigation';
import { IconButton, InputAdornment } from '@mui/material';

import "../css/signin.css";

export default function SignIn() {
  const router = useRouter();
  const id = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/form';

    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    const response = await fetch(endpoint, options);
    // const result = await response.json();
    const result = data.get('id');
    if(result !== null) {
      dispatch(saveId(result.toString()));
    }
    router.push('/home');

    // if(result.data === data.get('name')) {
    // }

  };

  return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box className="outerBox">
          <Avatar sx={{width: 100, height: 100}} src='\resources\standardinsurancelogo.png'/>
          <Typography component="h1" variant="h5">
            Support - Services
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Employee ID"
              name="id"
              autoFocus
              InputProps={{
              endAdornment: <InputAdornment position="end">
                              <IconButton
                                type="submit"
                                edge="end"
                              >
                                <ArrowCircleRightOutlinedIcon sx={{color: '#EAB959'}} />
                              </IconButton>
                            </InputAdornment> 
              }}
            >
            </TextField>
          </Box>
        </Box>
      </Container>
  );
}