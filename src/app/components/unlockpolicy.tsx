"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { unlockPolicy } from "../api/put";
import { useAppSelector } from "../hooks";

import "../css/home.css";
import React from "react";

export default function UnlockPolicy() {
  const id: string = useAppSelector((state) => state.support.id);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      branchCode: "",
      prodCode: "",
      polNo: "",
      userId: id,
    },
    mode: "onChange"
  });

  const handleRegistration = (data: any) => {
    console.log(data);
    unlockPolicy(data);
    reset();
  };

  return (
    <Box className="homeForm">
      <Typography
        component="h1"
        variant="overline"
        sx={{ color: "#EAB959", fontSize: 25 }}
      >
        Unlock Policy
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
        sx={{ mt: 1, display: "grid" }}
      >
        <Controller
          control={control}
          name="branchCode"
          rules={{
            required: "Required",
            minLength: { value: 2, message: "Too Short" },
            maxLength: { value: 7, message: "Too Long" },
          }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              margin="normal"
              id="branchCode"
              label="Branch Code"
              name="branchCode"
              autoFocus
              error={formState.errors.branchCode !== undefined ? true : false}
              helperText={
                formState.errors ? formState.errors.branchCode?.message : null
              }
            />
          )}
        />
        <Controller
          control={control}
          name="prodCode"
          rules={{
            required: "Required",
            minLength: { value: 3, message: "Too Short" },
            maxLength: { value: 3, message: "Too Long" },
          }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              margin="normal"
              id="prodCode"
              label="Prod Code"
              name="prodCode"
              error={formState.errors.prodCode !== undefined ? true : false}
              helperText={
                formState.errors ? formState.errors.prodCode?.message : null
              }
            />
          )}
        />
        <Controller
          control={control}
          name="polNo"
          rules={{
            required: "Required",
            pattern: { value: /^[0-9]*$/, message: "Numbers only" },
            minLength: { value: 1, message: "Too Short" },
            maxLength: { value: 9, message: "Too Long" },
          }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              margin="normal"
              id="polNo"
              label="Policy No"
              name="polNo"
              error={formState.errors.polNo !== undefined ? true : false}
              helperText={
                formState.errors ? formState.errors.polNo?.message : null
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
