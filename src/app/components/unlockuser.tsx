"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import "../css/home.css";
import { useForm } from "react-hook-form";

export default function UnlockUser() {
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
          empId: "",
        },
        mode: 'onChange',
      });

    const handleRegistration = (data: any) => {
        console.log(data);
      }

    return (
        <Grid item xs={3} className="homeForm">
            <Typography component="h1" variant="h5">
                Unlock User
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
                <TextField
                    {...register('empId', {
                        required: "Required",
                        minLength: {
                            value: 7,
                            message: "Too Short"
                        },
                        maxLength: {
                            value: 7,
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
                <Button
                    className="homeFormButton"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                Unlock User
                </Button>     
            </Box>
        </Grid>
    )
}