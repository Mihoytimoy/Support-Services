"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../hooks";
import { saveId, reset, saveName } from "../features/support/support-slice";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import { IconButton, InputAdornment } from "@mui/material";

import "../css/signin.css";
import { useForm } from "react-hook-form";
import runOnce from "../api/runOnce";
import { getLogin } from "../api/get";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  runOnce(() => {
    dispatch(reset());
  });

  const handleRegistration = (data: any) => {
    console.log(data);
    getLogin(data, { setLoginInfo });
    console.log(loginInfo);
    if (loginInfo !== undefined) {
      dispatch(saveId(loginInfo.id.toString()));
      dispatch(saveName(loginInfo.password.toString()));
    }
    router.push("/home");
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box className="outerBox">
        <Box
          component="img"
          sx={{ width: "75%", height: "max-content" }}
          src="\resources\standardinsurancelogo.png"
        />
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mt: "5%",
            width: "100%",
            textAlign: "center",
            color: "black",
            fontFamily: "monospace",
          }}
        >
          Support - Services
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegistration)}
          noValidate
          sx={{ display: "contents", margin: "auto", textAlign: "center", mt: "2%" }}
        >
          <TextField
            {...register("id", {
              required: "Required",
              minLength: {
                value: 9,
                message: "Too Short",
              },
              maxLength: {
                value: 9,
                message: "Too Long",
              },
            })}
            sx={{mt: "3%", width: "50%"}}
            variant="outlined"
            name="id"
            id="id"
            margin="normal"
            label="Employee ID"
            autoFocus
            error={errors.id?.message !== undefined ? true : false}
            helperText={errors.id?.message}
          />
          <TextField
            {...register("password", {
              required: "Required",
              minLength: {
                value: 9,
                message: "Too Short",
              },
              maxLength: {
                value: 11,
                message: "Too Long",
              },
            })}
            type={showPassword === true ? "text" : "password"}
            sx={{mt: "2%", width: "50%"}}
            variant="outlined"
            name="password"
            id="password"
            margin="normal"
            label="Password"
            error={errors.password?.message !== undefined ? true : false}
            helperText={errors.password?.message}
            InputProps={{
            endAdornment: <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => {setShowPassword(!showPassword)}}
                            >
                            {showPassword === false ? <VisibilityIcon sx={{color: '#EAB959'}}/> : <VisibilityOffIcon sx={{color: '#EAB959'}}/>}
                            </IconButton>
                          </InputAdornment>
            }}
          />
          <Box sx={{ mt: '2%'}}>
            <IconButton type="submit" edge="end">
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: "2em", color: "#EAB959" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
