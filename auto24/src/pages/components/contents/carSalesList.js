import React from 'react';

import axios from 'axios';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";

export default class CarSalesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carID: '',
            carPrice: '',
            carMarkListID: '',
            carMarkListCarMark: '',
            carImg: ''
        }
    }

    componentDidMount() {
        axios.get(`https://34763323-f29b-4650-9431-f9015f329184.mock.pstmn.io/car`)
            .then(response => {
                this.setState({ carID: response.data.id });
                this.setState({carPrice: response.data.price});
                this.setState({carMarkListID: response.data.carMark.id});
                this.setState({carMarkListCarMark: response.data.carMark.carMark});
                this.setState({carImg: response.data.pictureDto});

            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { carList, carID, carPrice, carMarkListID, carMarkListCarMark, carImg } = this.state;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <MediaCard
                        carID={carID}
                        price={carPrice}
                        carMark={carMarkListCarMark}
                        pictureDto={carImg}
                    />
                </Grid>
            </Grid>
        );
    }
}
