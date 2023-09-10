"use client";
import { getOnHold } from "../api/get";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import "../css/home.css";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import OnHoldTable from "./onHoldTable";

export default function OnHold() {
  const [rows, setRows] = React.useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstResult: null,
      maxResult: null,
    },
    mode: "onChange",
  });

  const handleRegistration = (data: any) => {
    console.log(data);
    getOnHold(data, { setRows });
  };

  return (
    <Box className="homeForm" sx={{paddingTop: "0% !important"}}>
      <Box
        className="stickySearch"
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
      >
      <Typography
        component="h1"
        variant="overline"
        sx={{ color: "#EAB959", fontSize: 15, textAlign: "left", flexBasis: "100%" }}
      >
        Generate by No. of Results
      </Typography>
        <TextField
          {...register("firstResult", {
            required: "Required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Numbers only",
            },
          })}
          variant="standard"
          sx={{ m: 0, width: "15%", height: "10px" }}
          id="firstResult"
          label="First Result"
          name="firstResult"
          autoFocus
          error={errors.firstResult?.message !== undefined ? true : false}
          helperText={errors.firstResult?.message}
        />
        <TextField
          {...register("maxResult", {
            required: "Required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Numbers only",
            },
          })}
          variant="standard"
          sx={{ m: 0, width: "15%", height: "10px", marginLeft: "20px" }}
          id="maxResult"
          label="Max Result"
          name="maxResult"
          error={errors.maxResult?.message !== undefined ? true : false}
          helperText={errors.maxResult?.message}
        />
        <IconButton
          size="large"
          sx={{ marginLeft: "15px", marginTop: "8px" }}
          type="submit"
        >
          <SearchIcon sx={{fontSize: "1em"}}/>
        </IconButton>
      </Box>
      <br />
      <Typography
        component="h1"
        variant="overline"
        sx={{ color: "#EAB959", fontSize: 25 }}
      >
        On Hold Requests
      </Typography>
      <OnHoldTable values={rows} setRows={() => setRows} />
    </Box>
  );
}
