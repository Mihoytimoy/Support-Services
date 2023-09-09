"use client";
import '../css/sidebar.css';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Collapse, Typography, Container } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "../hooks"; 
import { mainMenuState, subMenuState } from '../features/support/support-slice';
import runOnce from "../api/runOnce";

const drawerWidth = 240;

export default function SideBar(props: any) {
  const [userId, setUserId] = React.useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id: string = useAppSelector((state) => state.support.id);
  let mainSelect: string = useAppSelector(state => state.support.main);
  let subSelect: string = useAppSelector(state =>state.support.sub);

  runOnce(() => setUserId(id));

  const saveMenu = (main:string, sub:string) => { //code here changes values in the store that concern the menu selections
    if(mainSelect === "") { //check if nothing has been selected yet
      dispatch(mainMenuState(main));
    }else if(mainSelect === main && sub === "") { //closing the menu by clicking same menu again
      dispatch(mainMenuState(""));
    }else if(mainSelect !== "" && sub === "") { //changing menu selections
      dispatch(mainMenuState(main));
    }else if(mainSelect !== "" && sub !== "") { //changing submenu selections
      dispatch(subMenuState(sub));
    };
  }

  const changePage = (page: string) => () => {
    switch(page) {
      case page = "Reset Password":  router.push('/reset-password');
      break;  
      case page = "Unlock User":  router.push('/unlock-user');
      break;
      case page = "Unlock Policy":  router.push('/unlock-policy');
      break;
      case page = "On-Hold":  router.push('/on-hold');
      break;
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100%'}}>
      <CssBaseline />
      <Drawer
        sx={{
            height: '80vh',
            minHeight: '60vh',
            maxHeight: '90vh',
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              height: 1,
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            '& .MuiPaper-root': {
              maxWidth: 1,
              height: 'inherit',
              position: 'relative',
              top: 'auto',
              left: 'auto',
              borderRadius:  '0px 20px 0px 0px',
              borderWidth: '1px',
              borderStyle: 'hidden',

            },
            '& .MuiDrawer-paperAnchorLeft': {
              maxWidth: 1,
              height: 'inherit',
              borderRadius: '10px 0px 0px 10px',
              position: 'absolute',
              top: 'auto',
              left: 'auto',
            }
          }}
          variant="permanent"
          anchor="left"
      >
          <Box component="img" 
            sx={{margin: '10px auto 0px auto',
                 width: .8, 
                 height: 'fit-content',
                }}
            src='\resources\standardinsurancelogo.png' /><br />
        <Box component="div" className="userInfoBox">
            <Box component='div' sx={{display: 'flex', alignItems: 'center'}}>
              <AccountCircleIcon fontSize='large'/>
              <Typography className="userInfo">
                Timothy Mendoza 
                <br/>
                ID: {userId}
              </Typography>
            </Box>
        </Box>
        <List sx={{
          '& .MuiListItemButton-root': {
            color: 'black',
            borderRadius: '10px 0px 0px 10px',
          },
          '& .MuiListItemButton-root:hover': {
            color: 'white',
            backgroundColor: '#EAB959',
          }
        }}>
          {/* User Services Menu */}
            <ListItem key={"User Services"} disablePadding>
              <ListItemButton selected={mainSelect === "User Services"} onClick={() => saveMenu("User Services", "")}>
                <ListItemIcon>
                    <ManageAccountsIcon fontSize='large'/>  
                </ListItemIcon>
                <ListItemText primary={"User Services"} />
                {mainSelect === "User Services" ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mainSelect === "User Services" ? true : false} timeout="auto" unmountOnExit>
              <List component="div" className='dropdownMenu'>
                <ListItem key={"Reset Password"} disablePadding onClick={changePage("Reset Password")}>
                  <ListItemButton selected={subSelect === "Reset Password"} onClick={() => saveMenu("User Services", "Reset Password")}>
                    <ListItemIcon>
                      <LockResetIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Reset Password"}/>
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock User"} disablePadding onClick={changePage("Unlock User")}>
                  <ListItemButton selected={subSelect === "Unlock User"} onClick={() => saveMenu("User Services", "Unlock User")}>
                    <ListItemIcon>
                      <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock User"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock Policy"} disablePadding onClick={changePage("Unlock Policy")}>
                  <ListItemButton selected={subSelect === "Unlock Policy"} onClick={() => saveMenu("User Services", "Unlock Policy")}>
                    <ListItemIcon>
                      <PolicyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock Policy"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
            {/* Reports Menu */}
            <ListItem key={"Generate Reports"} disablePadding>
              <ListItemButton selected={mainSelect === "Generate Reports"} onClick={() => saveMenu("Generate Reports", "")}>
                <ListItemIcon>
                    <AssessmentIcon fontSize='large'/>  
                </ListItemIcon>
                <ListItemText primary={"Generate Reports"} />
                {mainSelect === "Generate Reports" ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mainSelect === "Generate Reports"? true : false} timeout="auto" unmountOnExit>
              <List component="div" className='dropdownMenu'>
                <ListItem key={"On-Hold"} disablePadding onClick={changePage("On-Hold")}>
                  <ListItemButton selected={subSelect === "On-Hold"} onClick={() => saveMenu("Generate Reports", "On-Hold")}>
                    <ListItemIcon>
                      <PauseCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={"On-Hold"}/>
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
        </List>
        </Drawer>
        <Box className='centerChildren'>
          {props.children}
        </Box>
    </Box>
  )
}