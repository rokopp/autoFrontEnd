import React from "react";
import {Grid} from "@material-ui/core";
import {CarDetailCard} from "./CarDetailCard";
import {SERVER_URL} from "../../../config";

export class CarDetailPage extends React.Component {
    constructor() {
        super();
        this.state = {
            carsList: []
        }
    }

    componentDidMount(){
        fetch(SERVER_URL + '/api/ads', {
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
        const checkID = this.props.match.params.carID;
        return (
            <div>
                {carsList
                    .map(function (item) {
                    if (item.id.toString() === checkID) {
                        return <Grid item xs={22} sm={14}>
                            <CarDetailCard
                                carID={item.id}
                                price={item.price}
                                carMark={item.carMark.carMark}
                                pictureDto={"data:image/png;base64," + item.pictureList[0].pictureFile}
                                serialNr={item.serialNr}
                                description={item.description}
                                userName={item.account.email}
                            />
                        </Grid>;
                    }
                    return null;
                })}
            </div>
        )
    }
}
