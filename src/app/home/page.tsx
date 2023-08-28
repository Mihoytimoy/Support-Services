"use client";
import { Container } from "@mui/material";
import SideBar from "../components/sidebar";
import { store } from "../store";
import { Provider } from "react-redux";
import style from "../css/home.module.css";

export default function Home(props: any) {
    return ( 
        <Provider store={store}>
            <Container maxWidth="md" className={style.homeContainer}>
                    <SideBar>
                        {props.children}
                    </SideBar>
            </Container>
        </Provider>
    )
}