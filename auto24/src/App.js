import React from 'react';
import './App.css';
import SearchAppBar from "./pages/components/app-bar/Search-bar";
import BackToTop from "./pages/components/app-bar/BackToTop";
import StickyFooter from "./pages/components/footer/StickyFooter";
import {Grid} from "@material-ui/core";
import Routing from "./Routing";


export default class App extends React.Component {
/*
    checkLogInStatus() {
        axios.get("http//localhost:8080/api/login", { withCredentials: true })
            .then(response => console.log("logged in?", response))
            .catch(error => console.log("check login error", error))
    }

    componentDidMount() {
        this.checkLogInStatus();
    }
*/
    render() {
        return (
            <div>
                <Grid container direction={"column"}>
                    <Grid item>
                        <SearchAppBar/>
                    </Grid>
                    <Grid item>
                        <img height="100%" width="100%"
                             src={"https://insidechange.org/wp-content/uploads/2019/01/car-sales-hand-shake.jpg.wrend_.640.360.jpeg"}/>
                    </Grid>

                    <Grid item container style={{paddingTop: "10%"}}>
                        <Grid item xs={0} sm={2}/>
                        <Grid item xs={12} sm={8}>
                            <Routing/>
                        </Grid>
                        <Grid item xs={0} sm={2}/>
                    </Grid>
                </Grid>
                <BackToTop/>
                <StickyFooter/>
            </div>
        );
    }
}
