"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { unlockPolicy } from "../api/put";
import { useAppSelector } from "../hooks";

import "../css/home.css";

export default function UnlockPolicy() {
    const id: string = useAppSelector((state) => state.support.id);
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
          branchCode: "",
          prodCode: "",
          polNo: null,
          userId: id
        },
        mode: 'onChange',
      });

    const handleRegistration = (data: any) => {
        console.log(data);
        console.log(unlockPolicy(data));
      }

    return (
        <Grid item xs={3} className="homeForm">
            <Typography component="h1" variant="overline" sx={{color: '#EAB959', fontSize: 18}}>
                Unlock Policy
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
                <TextField
                    {...register('branchCode', {
                        required: "Required",
                        minLength: {
                            value: 2,
                            message: "Too Short"
                        },
                        maxLength: {
                            value: 7,
                            message: "Too Long"
                        }
                    })}
                    margin="normal"
                    fullWidth
                    id="branchCode"
                    label="Branch Code"
                    name="branchCode"
                    autoFocus
                    error={errors.branchCode?.message !== undefined ? true : false}
                    helperText={errors.branchCode?.message}
                />     
                <TextField
                    {...register('prodCode', {
                        required: "Required",
                        minLength: {
                            value: 2,
                            message: "Too Short"
                        },
                        maxLength: {
                            value: 7,
                            message: "Too Long"
                        }
                    })}
                    margin="normal"
                    fullWidth
                    id="prodCode"
                    label="Prod Code"
                    name="prodCode"
                    error={errors.prodCode?.message !== undefined ? true : false}
                    helperText={errors.prodCode?.message}
                />
                <TextField
                    {...register('polNo', {
                        required: "Required",
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Numbers only"
                        },
                    })}
                    margin="normal"
                    fullWidth
                    id="polNo"
                    label="Policy No"
                    name="polNo"
                    error={errors.polNo?.message !== undefined ? true : false}
                    helperText={errors.polNo?.message}
                />
                <Button
                    className="homeFormButton"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                Unlock Policy
                </Button>     
            </Box>
    </Grid>
    )
}