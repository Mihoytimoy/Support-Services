"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import "../css/home.css";

export default function UnlockUser() {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/form';

        const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
        }

        const response = await fetch(endpoint, options);
        // const result = await response.json();

        router.push('/home');
        // if(result.data === data.get('name')) {
        // }

        console.log({
        name: data.get('name')
        });
    };

    return (
        <Grid item xs={3} className="homeForm">
            <Typography component="h1" variant="h5">
                Unlock User
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoFocus
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