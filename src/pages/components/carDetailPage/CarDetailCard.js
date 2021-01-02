import React, {Component} from 'react';
import {Box, Divider, Grid, Typography} from "@material-ui/core";

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

    // readFileToImg(file) {
    //     const sm = Object.entries(file).map(
    //         ([key, value]) => ({ [key]: value })
    //     );
    //     console.log(sm[0][0].pictureFile)
    //     const data1 = sm[0][0].pictureFile
    //     return "data:image/png;base64," + data1;
    // }
    render() {
        const { userName, price, description, pictureDto, carMark, carModel, serialNr} = this.props;
        console.log(pictureDto)
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
                </Grid>
            </div>
        );
    }
}

