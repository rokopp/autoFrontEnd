import React from 'react';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";

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
        fetch('http://13.53.200.72:8080/api/ads/search',
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
                console.log(response)
                this.setState({carsList: response})
            })
            .catch(error => {
                console.log(error)
            });
        console.log(this.props.match.params.carMark)
        console.log(this.props.match.params.carMarkId)
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
