import React from 'react';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";
import {SERVER_URL} from "../../../config";

export default class SearchResultsByCarMark extends React.Component {
    constructor() {
        super();
        this.state = {
            carsList: []
        }
    }
    componentDidMount(){

        let carMark = this.props.match.params.carMark;
        let carMarkId = this.props.match.params.carMarkId;
        fetch(SERVER_URL + '/api/ads/search',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": carMarkId.toString(),
                    "carMark": carMark
                })
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
        const { carsList } = this.state
        return (
            <div>
                <Grid container spacing={2}>
                    {carsList.map(function (item, index) {
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
    }
}
