import React from 'react';
import MediaCard from "../cards/MediaCards";
import {Grid} from "@material-ui/core";
import {SERVER_URL} from "../../../config";

export default class SearchResultsByPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carsList: [],
            url: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.startPrice !== this.props.match.params.startPrice ||
            prevProps.match.params.stopPrice !== this.props.match.params.stopPrice) {
            this.getSearchResults();
        }
    }

    getSearchResults() {
        let startPrice = this.props.match.params.startPrice;
        let stopPrice = this.props.match.params.stopPrice;

        if (stopPrice === "0") stopPrice = 1

        let url = SERVER_URL + '/api/ads/search?start=' + startPrice +
            '&stop=' + stopPrice;

        fetch(url,
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

    componentDidMount() {
        this.getSearchResults();
    }


    render() {
        const {carsList} = this.state
        if (typeof (carsList) !== 'undefined' && carsList.length !== 0) {
            return (
                <div>
                    <Grid container spacing={2}>
                        {carsList.map(function (item) {
                            return <Grid item xs={12} sm={4}><MediaCard
                                carID={item.id}
                                price={item.price}
                                carMark={item.carMark.carMark}
                                pictureDto={"data:image/png;base64," + item.pictureList[0].pictureFile}
                                userName={item.account.email}
                                description={item.description}
                            /></Grid>
                        })}
                    </Grid>
                </div>
            );
        } else {
            return (
                <div>
                    <Grid>
                        <h3>
                            Otsing tulemusi ei andnud
                        </h3>
                    </Grid>
                </div>
            )
        }
    }
}
