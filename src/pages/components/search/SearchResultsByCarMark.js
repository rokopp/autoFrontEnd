import React from 'react';
import {Grid} from "@material-ui/core";
import MediaCard from "../cards/MediaCards";
import {SERVER_URL} from "../../../config";

export default class SearchResultsByCarMark extends React.Component {
    constructor() {
        super();
        this.state = {
            carsList: [],
            isFound: true
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.carMark !== this.props.match.params.carMark ||
            prevProps.match.params.carMarkId !== this.props.match.params.carMarkId) {
            this.getSearchResults();
        }
    }

    getSearchResults() {
        let carMark = this.props.match.params.carMark;
        let carMarkId = this.props.match.params.carMarkId;
        if (carMarkId === "0") {
            this.setState({
                isFound: false
            })
        } else {
            this.setState({
                isFound: true
            })
        }
        fetch(SERVER_URL + '/api/ads/search',
            {
                method: 'POST',
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

    componentDidMount() {
        this.getSearchResults();
    }

    render() {
        const {carsList, isFound} = this.state
        let carMarkProps = this.props.match.params.carMark;
        console.log(carMarkProps)

        return (
            <div>
                {isFound ?
                    <Grid container spacing={2}>
                        {carsList.map(function (item, index) {
                            let carImg;
                            if (item.pictureList.length === 0 || item.pictureList[0].picturFile === null) {
                                carImg = "";
                            } else {
                                carImg = item.pictureList[0].pictureFile;
                            }
                            return <Grid item xs={12} sm={4}><MediaCard
                                carID={item.id}
                                price={item.price}
                                carMark={item.carMark.carMark}
                                pictureDto={"data:image/png;base64," + carImg}
                                userName={item.account.email}
                                description={item.description}
                            /></Grid>
                        })}
                    </Grid>
                    :
                    <Grid>
                        <h2>
                            Ei leitud antud automarki {carMarkProps}
                        </h2>
                    </Grid>
                }
            </div>
        );
    }
}
