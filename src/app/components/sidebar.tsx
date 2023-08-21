"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockResetIcon from '@mui/icons-material/LockReset';
import PolicyIcon from '@mui/icons-material/Policy';
import KeyIcon from '@mui/icons-material/Key';
import { Collapse, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "../hooks"; 
import '../css/sidebar.css';
import { mainMenuState, subMenuState } from '../features/support/support-slice';


const drawerWidth = 240;

export default function SideBar(props: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id: string = useAppSelector((state) => state.counter.id);
  const mainSelect: number = useAppSelector(state => state.counter.main);
  const subSelect: number = useAppSelector(state =>state.counter.sub);

  const saveMenu = (main: number, sub: number) => {
    if(mainSelect === 99) {
      dispatch(mainMenuState(main));
    }else if(mainSelect !== 99 && sub === 99) {
      dispatch(mainMenuState(99))
    }else if(mainSelect !== 99 && sub !== 99) {
      dispatch(subMenuState(sub));
    }
    
  }

  const changePage = (page: string) => () => {
    switch(page) {
      case page = "Reset Password":  router.push('/reset-password');
      break;  
      case page = "Unlock User":  router.push('/unlock-user');
      break;
      case page = "Unlock Policy":  router.push('/unlock-policy');
      break;
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
      >
        <List>
            <ListItem key={"User Services"} disablePadding>
              <ListItemButton selected={mainSelect === 0} onClick={() => saveMenu(0, 99)}>
                <ListItemIcon>
                    <ManageAccountsIcon fontSize='large'/>  
                </ListItemIcon>
                <ListItemText primary={"User Services"} />
                {mainSelect === 0 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mainSelect === 0 ? true : false} timeout="auto" unmountOnExit>
              <List component="div" className='dropdownMenu'>
                <ListItem key={"Reset Password"} disablePadding onClick={changePage("Reset Password")}>
                  <ListItemButton selected={subSelect === 0} onClick={() => saveMenu(0, 0)}>
                    <ListItemIcon>
                      <LockResetIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Reset Password"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock User"} disablePadding onClick={changePage("Unlock User")}>
                  <ListItemButton selected={subSelect === 1} onClick={() => saveMenu(0, 1)}>
                    <ListItemIcon>
                      <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock User"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock Policy"} disablePadding onClick={changePage("Unlock Policy")}>
                  <ListItemButton selected={subSelect === 2} onClick={() => saveMenu(0, 2)}>
                    <ListItemIcon>
                      <PolicyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock Policy"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
        </List>
        <Typography className='id' variant="overline">
          Name: 
          <br></br>
          Employee Id: {id}
        </Typography>
        </Drawer>
        {props.children}
    </Box>
  );
}