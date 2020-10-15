import React, {Component} from 'react';
import {Grid, Typography, Divider, Box} from "@material-ui/core";

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
    }

    render() {
        const { userName, price, description, pictureDto, carMark, carModel, carID} = this.props;

        return (
            <div>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12} align="center">
                        <Typography gutterBottom variant="h5" component="h2">
                            {carMark} {carModel}
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Box {...boxStyle} borderRight={0}>
                            <img width="100%" height="100%" src={pictureDto}/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

