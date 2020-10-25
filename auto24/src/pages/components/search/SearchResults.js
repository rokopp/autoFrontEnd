import React from 'react';
import MediaCard from "../cards/MediaCards";
import {Grid} from "@material-ui/core";

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPrice: this.props.match.params.startPrice,
            stopPrice: this.props.match.params.stopPrice,
            carsList: [],
            url: ''
        }
    }

    componentDidMount(){
        const {startPrice, stopPrice} = this.state;

        let url = 'http://localhost:8080/api/ads/search?start=' + startPrice +
            '&stop=' + stopPrice;

        console.log(url);
        fetch(url,
            {
                method: 'GET',
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({carsList: response})
            })
            .catch(error => {
                console.log(error)
            });
        console.log(this.props.match.params.startPrice)
    }



    render() {
        const { carsList } = this.state
        return (
            <div>
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
            </div>
        );
    }
}
