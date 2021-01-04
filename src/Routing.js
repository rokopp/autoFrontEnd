import React from 'react';
import {Route, Switch} from "react-router-dom";
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
        const { error, isAdmin, token } = this.props
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/registreeri" component={RegisterPage} />
                <Route path="/carAds" search={"id=:carID"} render={() => (
                    <CarDetailPage isAdmin={isAdmin} token={token} />
                )}/>
                <Route path="/uus" render={() => (
                    <SaveAds isAdmin={isAdmin} token={token} />
                )}/>
                <Route path="/otsing/hind/:startPrice/:stopPrice" component={SearchResultsByPrice} />
                <Route path="/otsing/mark/:carMarkId/:carMark" component={SearchResultsByCarMark} />
                <Route path="/admin/registreeri" render={() => (
                    <AdminRegisterPage isAdmin={isAdmin} token={token}/>
                )}/>
                <Route path="/admin/carMarks" render={() => (
                    <AddCarMarks isAdmin={isAdmin} token={token}/>
                )}/>
                <Route exact path="/login" render={() => (
                    <LoginPage {...this.props} error={error} />
                )}/>

            </Switch>
        );
    }
}
