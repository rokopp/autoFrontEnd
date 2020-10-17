import React from "react";
import {Grid} from "@material-ui/core";
import {CarDetailCard} from "./CarDetailCard";

export class CarDetailPage extends React.Component {
    constructor() {
        super();
        this.state = {
            carsList: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/ads', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({carsList: response.data})
                console.log(response.data)
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
                            <CarDetailCard
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
