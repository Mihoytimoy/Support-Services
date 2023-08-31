"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch } from "../hooks"; 
import { saveId, reset } from "../features/support/support-slice";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { useRouter } from 'next/navigation';
import { IconButton, InputAdornment } from '@mui/material';

import "../css/signin.css";
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      id: ""
    },
    mode: 'onChange',
  });

  const useInit = (initCallback: () => void) => {
    const [initialized, setInitialized] = React.useState(false);

    if(!initialized) {
      initCallback()
      setInitialized(true);
    }
  };
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  useInit(() => {
    dispatch(reset());
  })

  const handleRegistration = (data: any) => {
    console.log(data);
    const result = data.id;
    if(result !== null) {
      dispatch(saveId(result.toString()));
    }
    router.push('/home');
  }

  return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box className="outerBox">
          <Avatar sx={{width: 100, height: 100}} src='\resources\standardinsurancelogo.png'/>
          <Typography component="h1" variant="h5">
            Support - Services
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register('id', {
                required: "Required",
                minLength: {
                  value: 9,
                  message: "Too Short"
                },
                maxLength: {
                  value: 9,
                  message: "Too Long"
                }
              })}
              name='id'
              id='id'
              margin="normal"
              fullWidth
              label="Employee ID"
              autoFocus
              error={errors.id?.message !== undefined ? true : false}
              helperText={errors.id?.message}
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
