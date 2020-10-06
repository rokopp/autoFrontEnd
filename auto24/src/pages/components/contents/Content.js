import React from "react";
import MediaCard from "../cards/MediaCards";
import {Grid} from "@material-ui/core";
import carList from "./carSalesList";

const Content = () => {
    const getCarList = carListObj => {
        return (
            <Grid item xs={12} sm={4}>
                <MediaCard {...carListObj}/>
            </Grid>
        );
    }

    return (
        <Grid container spacing={2}>
            {carList.map(carListObj => getCarList(carListObj))}
        </Grid>
    );
}

export default Content;
