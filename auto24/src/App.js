import React from 'react';
import './App.css';
import SearchAppBar from "./pages/components/app-bar/Search-bar";
import BackToTop from "./pages/components/app-bar/BackToTop";
import StickyFooter from "./pages/components/footer/StickyFooter";
import Container from "@material-ui/core/Container";
import CarsTimeline from "./pages/components/timeline/CarsTimeline";
import MediaCard from "./pages/components/cards/MediaCards";
import {Grid} from "@material-ui/core";
import Content from "./pages/components/contents/Content";

function App() {
    return (
        <div>
            <Grid container direction={"column"}>
                <Grid item>
                    <SearchAppBar/>
                </Grid>
                <Grid item container>

                    <Grid item xs={0} sm={2}/>
                    <Grid item xs={12} sm={8}>
                        <Content/>
                    </Grid>
                    <Grid item xs={0} sm={2}/>
                </Grid>
            </Grid>
            <BackToTop/>
            <StickyFooter/>
        </div>
    );
}
export default App;
