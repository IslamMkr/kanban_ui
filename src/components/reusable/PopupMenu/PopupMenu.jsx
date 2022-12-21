import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { ListItemText } from '@mui/material';

const PopupMenu = ({ menuItems, onItemClicked }) => {

    useEffect(() => {
        console.log(menuItems)
    }, [])

    return (
        <Paper dsx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                {
                    menuItems.map(item => (
                        <MenuItem 
                            key={item.option}
                            onClick={() =>onItemClicked(item.option)}>
                            <ListItemText>{item.option}</ListItemText>
                        </MenuItem>
                    ))
                }
            </MenuList>
        </Paper>
    );
}

export default PopupMenu 