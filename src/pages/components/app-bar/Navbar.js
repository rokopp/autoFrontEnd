import React from 'react';
import { AppBar,
    Toolbar,
    IconButton,
    Typography,
    useScrollTrigger,
    Slide} from '@material-ui/core';

import PropTypes from "prop-types";
import PullDownDrawer from "./PullDownDrawer";


import ScrollToColor from "./ScrollToColor";
import { Link } from "react-router-dom";
import {useStyles} from "./NavbarUseStyles"
import SearchPage from "../search/SearchPage";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};


export default function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} id="back-to-top-anchor">
            <ScrollToColor>
                <AppBar position="fixed" color="transparent" elevation={0}>
                    <Toolbar>
                        <PullDownDrawer/>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <IconButton to="/" component={Link}>RIP-OFF Auto24</IconButton>
                        </Typography>
                        <div>
                            <SearchPage/>
                        </div>
                    </Toolbar>
                </AppBar>
            </ScrollToColor>
        </div>
    );
}
