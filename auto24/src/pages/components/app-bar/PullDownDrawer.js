import React from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { List, ListItem, ListItemText, Divider, IconButton, Drawer} from '@material-ui/core';
import {useStyles} from './NavbarUseStyles';


export default function PullDownDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const navbarLinks = [
        {
            name: "Logi sisse",
            link: "login"
        },
        {
            name: "Registreeri",
            link: "registreeri"
        },
        {
            name: "Loo kuulutus",
            link: "uus"
        }
    ];

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {navbarLinks.map((text, index) => (
                    <ListItem button component={Link} to={"/" + text.link} key={text.name}>
                        <ListItemText primary={text.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );


    return (
        <div>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon onClick={toggleDrawer(anchor, true)}/>
                    </IconButton>

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}