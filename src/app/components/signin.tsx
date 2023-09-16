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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { IconButton, InputAdornment } from "@mui/material";

import "../css/signin.css";
import { useForm } from "react-hook-form";
import { getLogin } from "../api/get";
import SuccessAlert from "./successAlert";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState(Object);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [status, setStatus] = React.useState(0);
  const [message, setMessage] = React.useState("");
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

  const runOnce = true;
  React.useEffect(() => {
    dispatch(reset());
  }, [runOnce]);

  React.useEffect(() => {
    console.log(status);
    if (status === 200) {
      setMessage("Login Successful!");
      setAlertOpen(true);
    } else if (status >= 400 || status === undefined) {
      setAlertOpen(true);
      setMessage("Login Unsuccessful!");
    }
  }, [status]);

  React.useEffect(() => {
    if (loginInfo.data !== undefined) {
      if (loginInfo.data.userid !== null) {
        setStatus(200);
        dispatch(saveId(loginInfo.data.userid));
        dispatch(
          saveName(loginInfo.data.lastname + " " + loginInfo.data.firstname)
        );
        router.push("/home");
      } else {
        setStatus(400);
      }
    }
  }, [loginInfo]);

  const handleRegistration = (data: any) => {
    setStatus(0);
    console.log(data);
    getLogin(data, setLoginInfo);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ height: "100vh", marginTop: "15vh" }}
    >
      <CssBaseline />
      <Box className="outerBox">
        <Box
          id="logo"
          component="img"
          src="\resources\standardinsurancelogo.png"
        />
        <SuccessAlert
          status={status}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          message={message}
        />
        <Box id="innerBox">
          <Box
            id="signInLogo"
            component="img"
            src="\resources\talk-to-us.svg"
          />
          <Box component="div" id="titledForm">
          <Typography
            component="h1"
            id="loginTitle"
          >
            Support - Services
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(handleRegistration)}
            noValidate
            sx={{
              display: "contents",
              margin: "auto",
              textAlign: "center",
              mt: "2%",
            }}
          >
            <TextField
              className="loginFields"
              {...register("id", {
                required: "Required",
                minLength: {
                  value: 9,
                  message: "Too Short",
                },
                maxLength: {
                  value: 20,
                  message: "Too Long",
                },
              })}
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
              className="loginFields"
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
              variant="outlined"
              name="password"
              id="password"
              margin="normal"
              label="Password"
              error={errors.password?.message !== undefined ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword === true ? (
                        <VisibilityIcon sx={{ color: "#3D405B" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#3D405B" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mt: "2%" }}>
              <IconButton type="submit" edge="end"
                disableRipple
              >
                <ArrowCircleRightOutlinedIcon
                  sx={{ fontSize: "2em", color: "#3D405B" }}
                />
              </IconButton>
            </Box>
          </Box> 
        </Box>
        </Box>
      </Box>
    </Container>
  );
}
