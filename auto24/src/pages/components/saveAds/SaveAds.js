import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "Bob",
            uploadFile: null,
            ad: {
                carMark: {
                    carMark: "Audi"
                },
                description: "asd",
                price: 0,
                carSerialNr: "kka5k"
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFileChange = this.uploadFileChange.bind(this);
    }


    handleChange(event) {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    uploadFileChange(event) {
        this.setState({
            uploadFile: event.target.files[0],
            loaded: 0
        })
    }

    handleSubmit(event) {
        const {username, uploadFile, ad} = this.state;
        event.preventDefault();

        const data = new FormData()
        data.append('file', uploadFile);
        data.append('userName', username);
        data.append('ad', JSON.stringify(ad));
        console.log(JSON.stringify(ad));
        fetch('http://localhost:8080/api/ads', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: (data)
        })

            .then((response) => response.text())
            .then((responseData) => {
                console.log("RESULTS HERE:", responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {
        return (
            <div>
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                            className="login-form"
                        >
                            <Grid item>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Kasutanimi"
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="file"
                                                name="file"
                                                placeholder="Lisa pildid"
                                                value={this.state.file}
                                                onChange={this.uploadFileChange}
                                                fullWidth
                                                variant="outlined"
                                                autoFocus
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Auto mark"
                                                fullWidth
                                                name="carMark"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.ad.carMark}
                                                inputProps={{ maxLength: 12 }}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Kirjeldus"
                                                fullWidth
                                                name="description"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.description}
                                                inputProps={{ maxLength: 255 }}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Hind"
                                                fullWidth
                                                name="price"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.price}
                                                inputProps={{ maxLength: 7 }}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Auto nr"
                                                fullWidth
                                                name="carSerialNr"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.carSerialNr}
                                                inputProps={{ maxLength: 6 }}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="button-block"
                                            >
                                                Salvesta kuulutus
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
