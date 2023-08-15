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
import '../css/sidebar.css';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function SideBar(props: any) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  
  const expandMenu = () => {
    setOpen(!open);
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
            <ListItem key={"User Services"} disablePadding onClick={expandMenu}>
              <ListItemButton>
                <ListItemIcon>
                    <ManageAccountsIcon fontSize='large'/>  
                </ListItemIcon>
                <ListItemText primary={"User Services"} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" className='dropdownMenu'>
                <ListItem key={"Reset Password"} disablePadding onClick={changePage("Reset Password")}>
                  <ListItemButton >
                    <ListItemIcon>
                      <LockResetIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Reset Password"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock User"} disablePadding onClick={changePage("Unlock User")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock User"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Unlock Policy"} disablePadding onClick={changePage("Unlock Policy")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PolicyIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Unlock Policy"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
        </List>
        </Drawer>
        {props.children}
    </Box>
  );
}