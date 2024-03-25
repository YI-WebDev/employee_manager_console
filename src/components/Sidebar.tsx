import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {textStyled} from '../style/SidebarStyles';
import {Box} from '@mui/material';
import sidebarImage from '../img/TitleLogo.png'

const Sidebar: React.FC = () => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 5,
                    backgroundImage: `url(${sidebarImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: 150,
                }}
            />
            <List>
                <ListItem
                    component={textStyled}
                    to="/"
                    sx={{ mt: 0.5, mb: 2 }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="HOME" 
                    />
                </ListItem>
                <ListItem
                    component={textStyled}
                    to="/add"
                >
                    <ListItemIcon>
                        <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="ADD" 
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;