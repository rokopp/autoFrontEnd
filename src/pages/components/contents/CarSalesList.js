import React from 'react';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";
import {SERVER_URL} from "../../../config";

export default class CarSalesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carsList: []
        }
    }

    componentDidMount(){
        fetch(SERVER_URL + '/api/ads',
            {
                method: 'GET',
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
                    {carsList.map(function (item) {
                        function readFileToImg(file) {
                            if (file !== null && typeof(file) !== 'undefined') {
                                return "data:image/png;base64," + file.pictureFile;
                            }
                        }

                        return <Grid item xs={12} sm={4}><MediaCard
                            carID={item.id}
                            price={item.price}
                            carMark={item.carMark.carMark}
                            pictureDto={readFileToImg(item.pictureList[0])}
                            userName={item.account.email}
                            description={item.description}
                        /></Grid>
                    })}
            </Grid>
        );
    }
}
