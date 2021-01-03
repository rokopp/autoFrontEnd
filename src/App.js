import React from 'react';
import './App.css';
import Navbar from "./pages/components/app-bar/Navbar";
import BackToTop from "./pages/components/app-bar/BackToTop";
import StickyFooter from "./pages/components/footer/StickyFooter";
import {Grid} from "@material-ui/core";
import Routing from "./Routing";
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_URL} from "./config";


const inputs = [{
    name: "username",
    placeholder: "Kasutajanimi",
    type: "text",
},{
    name: "password",
    placeholder: "Parool",
    type: "password",
},{
    type: "submit",
    value: "Logi sisse",
    color: "primary",
    className: "button-block"
}]

const props = {
    name: 'loginForm',
    method: 'POST',
    action: SERVER_URL + '/perform_login',
    inputs: inputs
}

const params = new URLSearchParams(window.location.search)

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            isAdmin: false,
            token: ""
        }

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                const username = JSON.parse(value).userName;
                const loggedIn = JSON.parse(value).loggedIn;
                const isAdmin = JSON.parse(value).isAdmin;
                const token = JSON.parse(value).token;

                this.setState({
                    userName: username,
                    loggedIn: loggedIn,
                    token: token,
                    isAdmin: isAdmin
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log("Something went wrong", error);
        }
    };

    componentDidMount() {
        this._retrieveData();
    }

    render() {

        const {isAdmin, loggedIn, token} = this.state;
        return (
            <div>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Navbar isAdmin={isAdmin} loggedIn={loggedIn}/>
                    </Grid>

                    <Grid item>
                        <img alt="" height="100%" width="100%"
                             src={"https://insidechange.org/wp-content/uploads/2019/01/car-sales-hand-shake.jpg.wrend_.640.360.jpeg"}/>
                    </Grid>

                    <Grid item container style={{paddingTop: "10%"}}>
                        <Grid item xs={0} sm={2}/>
                        <Grid item xs={12} sm={8}>
                            <Routing {...props} error={params.get('error')} isAdmin={isAdmin} token={token}/>
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

