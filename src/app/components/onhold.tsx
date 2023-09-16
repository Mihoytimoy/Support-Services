"use client";
import { getOnHold } from "../api/get";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import OnHoldTable from "./onHoldTable";
import "../css/releaseReports.css"

export default function OnHold() {
  const [rows, setRows] = React.useState();
  const [firstResult, setFirstResult] = React.useState("");
  const [maxResult, setMaxResult] = React.useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstResult: 1,
      maxResult: 5,
    },
    mode: "onChange",
  });

  
  const handleRegistration = (data: any) => {
    console.log(data);
    setFirstResult(data.firstResult);
    setMaxResult(data.maxResult);
    getOnHold(data, { setRows });
  };

  const runOnce = true;
  React.useEffect(() => {
    handleRegistration({ firstResult: 1, maxResult: 5 });
  }, [runOnce]);

  
  return (
    <Box className="homeForm" sx={{ paddingTop: "0% !important" }}>
      <Box
        className="stickySearch"
        component="form"
        onSubmit={handleSubmit(handleRegistration)}
        noValidate
      >
        <Typography
          component="h1"
          variant="overline"
          sx={{
            color: "#373737",
            fontSize: {xs: '10px', sm: '14px'},
            textAlign: "left",
            flexBasis: "100%",
          }}
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
          sx={{ m: 0, width: {xs: "30%", sm: "15%"}, height: "10px" }}
          id="firstResult"
          label="Page Number"
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
          sx={{ m: 0, width: {xs: "30%", sm: "15%"}, height: "10px", marginLeft: "20px" }}
          id="maxResult"
          label="Max Result"
          name="maxResult"
          error={errors.maxResult?.message !== undefined ? true : false}
          helperText={errors.maxResult?.message}
        />
        <IconButton
          id="onHoldSearch"
          type="submit"
        >
          <SearchIcon sx={{ color: "white", fontSize: "1em" }} />
        </IconButton>
        <Typography
          component="h1"
          variant="overline"
          sx={{
            marginTop: {xs: "5%", sm: "0"},
            color: "#373737",
            fontSize: {xs: '19px', sm: '22px'},
            fontWeight: "bold",
            flexGrow: "1",
            textAlignLast: "right"
          }}
        >
          On Hold Requests
        </Typography>
      </Box>
      {/* <br /> */}
      <OnHoldTable
        values={rows}
        setRows={() => setRows}
        getOnHold={() => getOnHold}
        firstResult={firstResult}
        maxResult={maxResult}
      />
    </Box>
  );
}
