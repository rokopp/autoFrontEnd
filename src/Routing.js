import React from 'react';
import {Route, Switch} from "react-router-dom";
import CarSalesList from "./pages/components/contents/CarSalesList";
import {RegisterPage} from "./pages/components/login/RegisterPage";
import {CarDetailPage} from "./pages/components/carDetailPage/CarDetailPage";
import SaveAds from "./pages/components/saveAds/SaveAds";
import SearchResultsByPrice from "./pages/components/search/SearchResultsByPrice";
import SearchResultsByCarMark from "./pages/components/search/SearchResultsByCarMark";

export default class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={CarSalesList} exact />
                <Route path="/registreeri" component={RegisterPage} />
                <Route path="/carAds/:carID" component={CarDetailPage} />
                <Route path="/uus" component={SaveAds} />
                <Route path="/otsing/hind/:startPrice/:stopPrice" component={SearchResultsByPrice} />
                <Route path="/otsing/mark/:carMarkId/:carMark" component={SearchResultsByCarMark} />
                <Route component={Error} />
            </Switch>
        );
    }
}
