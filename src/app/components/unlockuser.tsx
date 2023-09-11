"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { unlockUser } from "../api/put";
import { Controller, useForm } from "react-hook-form";
import "../css/home.css";
import { useAppSelector } from "../hooks";
import React from "react";
import SuccessAlert from "./successAlert";

export default function UnlockUser() {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [status, setStatus] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const id: string = useAppSelector((state) => state.support.id);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      empId: "",
      userId: id,
    },
    mode: "onChange"
  });

  React.useEffect(() => {
    if(status === 200) {
      setMessage("Unlock User Successful!");
      setAlertOpen(true);
    }else if(status >= 400 || status === undefined) {
      setAlertOpen(true);
      setMessage("Unlock User Unsuccessful!");
  }
    }, [status]);

  const handleRegistration = (data: any) => {
    console.log(data);
    unlockUser(data, setStatus);
    reset();
    setStatus(0); //I need this to re-initialize status so that the next successfull status can trigger the useeffect

  };

  return (
    <Box className="homeForm">
      <SuccessAlert status={status} alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={message}/>
      <Typography
        component="h1"
        variant="overline"
        sx={{ color: "#EAB959", fontSize: 25, fontWeight: "bold" }}
      >
        Unlock User
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
        sx={{ mt: 1, display: "grid"  }}
      >
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
        <Button
          className="homeFormButton"
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
