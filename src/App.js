import React from 'react';
import './App.css';
import Navbar from "./pages/components/app-bar/Navbar";
import BackToTop from "./pages/components/app-bar/BackToTop";
import StickyFooter from "./pages/components/footer/StickyFooter";
import {Grid} from "@material-ui/core";
import Routing from "./Routing";
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        }

    }


    checkLogInStatus(username, password) {
        const bodyData = JSON.stringify({
            userName: username,
            password: password,
        },)
        fetch("http://13.53.200.72:8080/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData,
            withCredentials: true
        })
            .then(res => res.text())
            .then(response => {
                console.log(response)
                if (response === 'success') {
                    this.setState({
                        loggedIn: true
                    })
                }
            })
            .catch(error => console.log("check login error", error))

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                const username = JSON.parse(value).userName;
                const password = JSON.parse(value).password;
                this.checkLogInStatus(username, password);
            }
        } catch (error) {
            // Error retrieving data
            console.log("Something went wrong", error);
        }
    };

    componentDidMount() {
        this._retrieveData();
        // document.title = 'App';
    }

    render() {
        return (
            <div>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Navbar/>
                    </Grid>

                    <Grid item>
                        <img alt="" height="100%" width="100%"
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

