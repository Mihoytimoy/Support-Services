"use client";
import { Container } from "@mui/material";
import SideBar from "../components/sidebar";

import "../css/home.css";

export default function Home(props: any) {
    return ( 
        <Container maxWidth="md" className="homeContainer">
                <SideBar>
                    {props.children}
                </SideBar>
        </Container>
    )
}