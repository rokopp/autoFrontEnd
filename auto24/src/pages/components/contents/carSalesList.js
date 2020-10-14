import React from 'react';

import axios from 'axios';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";

export default class CarSalesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carsList: []
        }
    }

    componentDidMount(){
        axios.get('https://db8ddf1b-ac50-4227-8b9d-3addfcafe81d.mock.pstmn.io/adsCar')
            .then(response => {
                this.setState({carsList: response.data})
            })
            .catch(error => {
                console.log(error)
            });
    }


    render() {

        const { carsList } = this.state;

        return (

            <Grid container spacing={2}>
                    {carsList.map(function (item, index) {
                        return <Grid item xs={12} sm={4}><MediaCard
                            carID={item.id}
                            price={item.price}
                            carMark={item.carMark.carMark}
                            pictureDto={item.pictureDto}
                        /></Grid>
                    })}
            </Grid>
        );
    }
}
