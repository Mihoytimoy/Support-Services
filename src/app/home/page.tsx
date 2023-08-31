"use client";
import { Container, Grid } from "@mui/material";
import SideBar from "../components/sidebar";
import { store } from "../store";
import { Provider } from "react-redux";
import "../css/home.css";

export default function Home(props: any) {
    return ( 
        <Provider store={store}>
            <Container maxWidth="md" className="homeContainer">
                    <SideBar>
                        {props.children}
                    </SideBar>
            </Container>
        </Provider>
    )
}