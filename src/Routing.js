import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import CarSalesList from "./pages/components/contents/CarSalesList";
import {RegisterPage} from "./pages/components/login/RegisterPage";
import {CarDetailPage} from "./pages/components/carDetailPage/CarDetailPage";
import SaveAds from "./pages/components/saveAds/SaveAds";
import SearchResultsByPrice from "./pages/components/search/SearchResultsByPrice";
import SearchResultsByCarMark from "./pages/components/search/SearchResultsByCarMark";
import LoginPage from "./pages/components/login/LoginPage";
import {AdminRegisterPage} from "./pages/components/login/AdminRegisterPage";
import AddCarMarks from "./pages/components/carMarks/AddCarMarks"

export default class Routing extends React.Component {
    render() {
        const { error, isAdmin } = this.props
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/registreeri" component={RegisterPage} />
                <Route path="/carAds/:carID" component={CarDetailPage} />
                <Route path="/uus" render={() => (
                    <SaveAds isAdmin={isAdmin} />
                )}/>
                <Route path="/otsing/hind/:startPrice/:stopPrice" component={SearchResultsByPrice} />
                <Route path="/otsing/mark/:carMarkId/:carMark" component={SearchResultsByCarMark} />
                <Route path="/admin/registreeri" render={() => (
                    <AdminRegisterPage isAdmin={isAdmin} />
                )}/>
                <Route path="/admin/carMarks" render={() => (
                    <AddCarMarks isAdmin={isAdmin} />
                )}/>
                <Route path="/user">
                    <Redirect to="/"/>
                </Route>
                <Route exact path="/login" render={() => (
                    <LoginPage {...this.props} error={error} />
                )}/>

            </Switch>
        );
    }
}
