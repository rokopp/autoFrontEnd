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



/*
export default [
    {
        avatarSrc: "",
        userName: "Robin",
        price: "30 000",
        description: "sitaks norm pill",
        pictureDto: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/1987_Audi_80_%288098067988%29.jpg/280px-1987_Audi_80_%288098067988%29.jpg",
        carMark: "Audi",
        carModel: "80"
    },
    {
        avatarSrc: "",
        userName: "Robin",
        price: "35 440",
        description: "4x4 Adidas dressi saab peale kauba kaasa",
        pictureDto: "https://drivetribe.imgix.net/BDHBClgNSoKJ-Yy8aEekKQ",
        carMark: "Lada",
        carModel: "Niva"
    },
    {
        avatarSrc: "",
        userName: "Robin",
        price: "10 000",
        description: "Panen täis paagi maksab 2x rohkem",
        pictureDto: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Opel_Omega_II_2.2i_Facelift_front_20100509.jpg/1200px-Opel_Omega_II_2.2i_Facelift_front_20100509.jpg",
        carMark: "Opel",
        carModel: "Omega"
    }
]
*/
