"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { unlockUser } from "../api/put";
import { Controller, useForm } from "react-hook-form";
import "../css/home.css";
import { useAppSelector } from "../hooks";

export default function UnlockUser() {
  const id: string = useAppSelector((state) => state.support.id);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      empId: "",
      userId: id,
    },
    mode: "onChange"
  });

  const handleRegistration = (data: any) => {
    console.log(data);
    unlockUser(data);
    reset();
  };

  return (
    <Box className="homeForm">
      <Typography
        component="h1"
        variant="overline"
        sx={{ color: "#EAB959", fontSize: 25 }}
      >
        Unlock User
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
        sx={{ mt: 1 }}
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
  );
}
