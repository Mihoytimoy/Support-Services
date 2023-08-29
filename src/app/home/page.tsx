"use client";
import { Container, Grid } from "@mui/material";
import SideBar from "../components/sidebar";
import { store } from "../store";
import { Provider } from "react-redux";
import style from "../css/home.module.css";

export default function Home(props: any) {
    return ( 
        <Provider store={store}>
            <Container maxWidth="md" className={style.homeContainer}>
                    <SideBar>
                    <Grid item xs={3} className={style.homeForm}>
                        {props.children}
                    </Grid>
                    </SideBar>
            </Container>
        </Provider>
    )
}