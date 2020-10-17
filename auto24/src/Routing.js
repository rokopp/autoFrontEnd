import React from 'react';
import {Route, Switch} from "react-router-dom";
import CarSalesList from "./pages/components/contents/carSalesList";
import LoginPage from "./pages/components/login/LoginPage";
import {RegisterPage} from "./pages/components/login/RegisterPage";
import {CarDetailPage} from "./pages/components/carDetailPage/CarDetailPage";
import SaveAds from "./pages/components/saveAds/SaveAds";

export default class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/login" component={LoginPage} />
                <Route path="/registreeri" component={RegisterPage} />
                <Route path="/carAds/:carID" component={CarDetailPage} />
                <Route path="/uus" component={SaveAds} />
                <Route component={Error} />
            </Switch>
        );
    }
}
