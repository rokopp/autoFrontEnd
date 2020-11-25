import React from 'react';
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
        fetch('http://13.53.200.72:8080/api/ads',
            {
                method: 'GET'
            })
            .then(res => res.json())
            .then(response => {
                this.setState({carsList: response})
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
                            pictureDto={item.pictureList[0]}
                            userName={item.account.email}
                            description={item.description}
                        /></Grid>
                    })}
            </Grid>
        );
    }
}
