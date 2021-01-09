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
        const { token, isAdmin } = this.props
        const url = new URLSearchParams(window.location.search)
        const checkID = url.get("id");
        return (
            <div>
                {carsList
                    .map(function (item) {
                    if (item.id.toString() === checkID) {
                        let carImg;
                        if (item.pictureList.length === 0) {
                            carImg = "";
                        } else {
                            carImg = item.pictureList[0].pictureFile;
                        }
                        return <Grid item xs={22} sm={14}>
                            <CarDetailCard
                                carID={item.id}
                                price={item.price}
                                carMark={item.carMark.carMark}
                                pictureDto={"data:image/png;base64," + carImg}
                                serialNr={item.serialNr}
                                description={item.description}
                                userName={item.account.email}
                                token={token}
                                isAdmin={isAdmin}
                            />
                        </Grid>;
                    }
                    return null;
                })}
            </div>
        )
    }
}
