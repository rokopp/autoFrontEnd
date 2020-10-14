import React from 'react';
import {Route, Switch} from "react-router-dom";
import CarSalesList from "../contents/carSalesList";
import LoginPage from "../login/LoginPage";
import {RegisterPage} from "../login/RegisterPage";
import {CarDetailPage} from "../carDetailPage/CarDetailPage";

export default class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/Login" component={LoginPage} />
                <Route path="/Registreeri" component={RegisterPage} />
                <Route path="/carAds/:carID" component={CarDetailPage} />
                <Route component={Error} />
            </Switch>
        );
    }
}
