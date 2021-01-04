import React, {Component} from 'react';
import {Box, Divider, Grid, Typography} from "@material-ui/core";
import {SERVER_URL} from "../../../config";
import IconButton from "@material-ui/core/IconButton";

const boxStyle = {
    border: 1,
    borderColor: '#e0e0e0',
    paddingTop: "5%",
    paddingBottom: "5%",
    style: {
        width: '100%',
        height: '100%'
    },
}
export class CarDetailCard extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        const { carID, token } = this.props
        console.log(token)

        fetch(SERVER_URL + '/api/admin/ads/' + carID, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData === "Deleted ad: " + carID) {
                    alert("Kustutatud kuulutus");
                } else {
                    alert("Midagi läks viltu");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const { isAdmin, userName, price, description, pictureDto, carMark, carModel, serialNr} = this.props;
        return (
            <div>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12} align="center">
                        <Typography gutterBottom variant="h5" component="h2">
                            {carMark} {carModel} {serialNr}
                        </Typography>
                        <Divider/>
                    </Grid>

                    <Grid item xs={12} sm={6}>

                        <Typography gutterBottom variant="h8" component="h2">
                            Hind: {price}
                        </Typography>
                        <Divider/>
                        <Typography gutterBottom variant="h9" component="h2">
                            Kirjeldus: {description}
                        </Typography>
                        <Divider/>
                        <Typography gutterBottom variant="h9" component="h2">
                            Müüja: {userName}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Box {...boxStyle} borderRight={0}>
                            <img alt="" width="100%" height="100%" src={(pictureDto)}/>
                            </Box>
                        </Box>
                    </Grid>
                    {isAdmin ?
                        <Grid>
                            <IconButton onClick={this.handleDelete}>
                                Kustuta kuulutus
                            </IconButton>
                        </Grid> :
                        <br/>
                    }
                </Grid>
            </div>
        );
    }
}

