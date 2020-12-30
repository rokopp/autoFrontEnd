import React from 'react';
import {Route, Switch} from "react-router-dom";
import CarSalesList from "./pages/components/contents/CarSalesList";
import {RegisterPage} from "./pages/components/login/RegisterPage";
import {CarDetailPage} from "./pages/components/carDetailPage/CarDetailPage";
import SaveAds from "./pages/components/saveAds/SaveAds";
import SearchResultsByPrice from "./pages/components/search/SearchResultsByPrice";
import SearchResultsByCarMark from "./pages/components/search/SearchResultsByCarMark";
import LoginPage from "./pages/components/login/LoginPage";

export default class Routing extends React.Component {
    render() {
        const inputs = [{
            name: "username",
            placeholder: "username",
            type: "text"
        },{
            name: "password",
            placeholder: "password",
            type: "password"
        },{
            type: "submit",
            value: "Submit",
            className: "btn"
        }]
        const props = {
            name: 'loginForm',
            method: 'POST',
            action: 'http://localhost:8080/perform_login',
            inputs: inputs
        }
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/registreeri" component={RegisterPage} />
                <Route path="/carAds/:carID" component={CarDetailPage} />
                <Route path="/uus" component={SaveAds} />
                <Route path="/otsing/hind/:startPrice/:stopPrice" component={SearchResultsByPrice} />
                <Route path="/otsing/mark/:carMarkId/:carMark" component={SearchResultsByCarMark} />
                <Route exact path="/login" search="error=:error" render={() => (
                    <LoginPage {...props} isAuthed={true} />
                )}/>

            </Switch>
        );
    }
}
