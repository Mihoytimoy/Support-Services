"use client";
import { Container } from "@mui/material";
import SideBar from "../components/sidebar";
import "../css/home.css";
import { store } from "../store";
import { Provider } from "react-redux";

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