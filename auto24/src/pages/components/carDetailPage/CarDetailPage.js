import React from "react";
import axios from "axios";
import MediaCard from "../cards/MediaCards";
import {Grid} from "@material-ui/core";



export class CarDetailPage extends React.Component {
    constructor() {
        super();
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
        const checkID = this.props.match.params.carID;
        return (
            <div>
                {carsList.map(function (item, index) {
                    if (item.id.toString() === checkID) {
                        return <Grid item xs={22} sm={14}>
                            <MediaCard
                                carID={item.id}
                                price={item.price}
                                carMark={item.carMark.carMark}
                                pictureDto={item.pictureDto}
                            />
                        </Grid>;
                    }
                })}
            </div>
        )
    }
}
