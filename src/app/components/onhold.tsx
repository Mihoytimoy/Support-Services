"use client";
import { getOnHold } from "../api/get";
import { useForm } from "react-hook-form";
import "../css/home.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

interface OnHoldReq {
    requestNo: number;
    reportName: string;
    branch: string;
    dateFrom: number;
    dateTo: number;
    dateRequested: number;
    requestedBy: string;
}

function createData(
    requestNo: number,
    reportName: string,
    branch: string,
    dateFrom: number,
    dateTo: number,
    dateRequested: number,
    requestedBy: string
): OnHoldReq {
    return {
        requestNo,
        reportName,
        branch,
        dateFrom,
        dateTo,
        dateRequested,
        requestedBy
    };
}

export default function OnHold() {
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
          firstResult: null,
          maxResult: null,
        },
        mode: 'onChange',
      });

    const handleRegistration = (data: any) => {
        console.log(data);
        getOnHold(data);
      }

      return (
        <Grid item xs={3} className="homeForm">
        <Typography component="h1" variant="overline" sx={{color: '#EAB959', fontSize: 25}}>
            dummy
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleRegistration)} noValidate sx={{ mt: 1 }}>
            <TextField
                {...register('firstResult', {
                    required: "Required",
                    pattern: {
                        value: /^[0-9]*$/,
                        message: "Numbers only"
                    },
                })}
                margin="normal"
                fullWidth
                id="empId"
                label="Employee ID"
                name="empId"
                autoFocus
                error={errors.firstResult?.message !== undefined ? true : false}
                helperText={errors.firstResult?.message}
            />     
            <TextField
                {...register('maxResult', {
                    required: "Required", 
                    pattern: {
                        value: /^[0-9]*$/,
                        message: "Numbers only"
                    },  
                })}
                margin="normal"
                fullWidth
                id="tempPassword"
                label="Temporary Password"
                name="tempPassword"
                error={errors.maxResult?.message !== undefined ? true : false}
                helperText={errors.maxResult?.message}
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