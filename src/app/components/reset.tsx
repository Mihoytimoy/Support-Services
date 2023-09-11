"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { resetPWD } from "../api/get";

import "../css/home.css";
import { useAppSelector } from "../hooks";
import React from "react";
import SuccessAlert from "./successAlert";

export default function Reset() {
    const id: string = useAppSelector((state) => state.support.id);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [status, setStatus] = React.useState(0);
    const [message, setMessage] = React.useState("");

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
          empId: "",
          tempPassword: "",
          userId: id,
        },
        mode: 'onChange',
      });

    React.useEffect(() => {
        console.log(status);
    if(status === 200) {
        setMessage("Password Reset Successful!");
        setAlertOpen(true);
    }else if(status >= 400 || status === undefined) {
        setAlertOpen(true);
        setMessage("Password Reset Unsuccessful!");
    }
    }, [status]);

    const handleRegistration = (data: any) => {
        console.log(data);
        resetPWD(data, setStatus);
        setStatus(0); //I need this to re-initialize status so that the next successfull status can trigger the useeffect
        reset();
      }

    return (
        <Box className="homeForm">
        <SuccessAlert status={status} alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={message}/>
            <Typography component="h1" variant="overline" sx={{color: '#EAB959', fontSize: 25, fontWeight: "bold"}}>
                Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1, display: "grid"  }}>
                <Controller
                    control={control}
                    name="empId"
                    rules={{
                        required: "Required",
                        minLength: { value: 9, message: "Too Short" },
                        maxLength: { value: 9, message: "Too Long" },
                    }}
                    render={({ field, formState }) => (
                        <TextField
                        {...field}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        margin="normal"
                        id="empId"
                        label="Employee ID"
                        name="empId"
                        autoFocus
                        error={formState.errors.empId !== undefined ? true : false}
                        helperText={
                            formState.errors ? formState.errors.empId?.message : null
                        }
                        />
                    )}
                />     
                <Controller
                    control={control}
                    name="tempPassword"
                    rules={{
                        required: "Required",
                        minLength: { value: 3, message: "Too Short" },
                        maxLength: { value: 8, message: "Too Long" },
                    }}
                    render={({ field, formState }) => (
                        <TextField
                        {...field}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        margin="normal"
                        id="tempPassword"
                        label="Temporary Password"
                        name="tempPassword"
                        error={formState.errors.tempPassword !== undefined ? true : false}
                        helperText={
                            formState.errors ? formState.errors.tempPassword?.message : null
                        }
                        />
                    )}
                />
                <Button
                    className="homeFormButton"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                Submit
                </Button>     
            </Box>
        </Box>
    )
}