import React from 'react';
import './App.css';
import SearchAppBar from "./pages/components/app-bar/Search-bar";
import BackToTop from "./pages/components/app-bar/BackToTop";
import StickyFooter from "./pages/components/footer/StickyFooter";
import Container from "@material-ui/core/Container";
import CarsTimeline from "./pages/components/timeline/CarsTimeline";
import MediaCard from "./pages/components/cards/MediaCards";

function App() {
    return (
        <div>
            <SearchAppBar/>
            <Container>
                <CarsTimeline/>
                <MediaCard/>
            </Container>
            <BackToTop/>
            <StickyFooter/>
        </div>
    );
}
export default App;
