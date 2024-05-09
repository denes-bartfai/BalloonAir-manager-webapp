import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';;
import InsertLinkIcon from '@mui/icons-material/InsertLink';



import "./Navbar.css";

const Navbar = () => {

  
  return (
    <div className="navbar-container">
      <Drawer
      anchor="left"
      variant="permanent"
      className="drawer"
      classes={{ paper: 'drawer-paper' }}
      >
      <List className="multi-list">
        <ListItem component={Link} to="/" className="list-item">
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Kezdőlap" />
        </ListItem>

        <ListItem component={Link} to="/sales" className="list-item">
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Eladás" />
        </ListItem>

        <ListItem component={Link} to="/statistic" className="list-item">
        <ListItemIcon>
          <AlignVerticalBottomIcon />
        </ListItemIcon>
        <ListItemText primary="Statisztika" />
        </ListItem>

        <ListItem component={Link} to="/contacts" className="list-item">
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Kontakt" />
        </ListItem>

        <ListItem component={Link} to="/calendar" className="list-item">
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Naptár" />
        </ListItem>

        <ListItem component={Link} to="/links" className="list-item">
        <ListItemIcon>
          <InsertLinkIcon />
        </ListItemIcon>
        <ListItemText primary="Link" />
        </ListItem>

      </List>
      </Drawer>

    </div>
  )
}

export default Navbar