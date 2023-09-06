"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { resetPWD } from "../api/get";

import "../css/home.css";
import { useAppSelector } from "../hooks";

export default function Reset() {
    const id: string = useAppSelector((state) => state.support.id);
    const { handleSubmit, register, formState: { errors } } = useForm({
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
      }

    return (
        <Grid item xs={3} className="homeForm">
            <Typography component="h1" variant="overline" sx={{color: '#EAB959', fontSize: 25}}>
                Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
                <TextField
                    {...register('empId', {
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
                    margin="normal"
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoFocus
                    error={errors.empId?.message !== undefined ? true : false}
                    helperText={errors.empId?.message}
                />     
                <TextField
                    {...register('tempPassword', {
                        required: "Required",
                        minLength: {
                            value: 3,
                            message: "Too Short"
                        },
                        maxLength: {
                            value: 8,
                            message: "Too Long"
                        }   
                    })}
                    margin="normal"
                    fullWidth
                    id="tempPassword"
                    label="Temporary Password"
                    name="tempPassword"
                    error={errors.tempPassword?.message !== undefined ? true : false}
                    helperText={errors.tempPassword?.message}
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
        </Grid>
    )
}