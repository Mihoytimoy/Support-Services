"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { resetPWD } from "../api/get";

import "../css/home.css";
import { useAppSelector } from "../hooks";

export default function Reset() {
    const id: string = useAppSelector((state) => state.support.id);
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
          empId: "",
          tempPassword: "",
          userId: id,
        },
        mode: 'onChange',
      });

    const handleRegistration = (data: any) => {
        console.log(data);
        resetPWD(data);
        reset();
      }

    return (
        <Box className="homeForm">
            <Typography component="h1" variant="overline" sx={{color: '#EAB959', fontSize: 25}}>
                Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
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
                        fullWidth
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
                        fullWidth
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