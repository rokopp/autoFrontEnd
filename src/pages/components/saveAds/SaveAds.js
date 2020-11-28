import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import AsyncStorage from "@react-native-community/async-storage";
import LoginPage from "../login/LoginPage";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            uploadFile: null,
            ad: {
                carMark: {
                    carMark: ""
                },
                description: "",
                price: 0,
                carSerialNr: ""
            },
            loggedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdChange = this.handleAdChange.bind(this);
        this.handleCarMarkChange = this.handleCarMarkChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFileChange = this.uploadFileChange.bind(this);
    }

    handleCarMarkChange(event) {
        this.setState({
            ad: {...this.state.ad, carMark: {...this.state.ad.carMark, [event.target.name]: event.target.value}}
        })
    }

    handleAdChange(event) {
        this.setState({
            ad: {...this.state.ad, [event.target.name]: event.target.value}
        })
    }

    handleChange(event) {
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

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value))

                const username = JSON.parse(value).username;
                this.setState({
                    loggedIn: true,
                    userName: username
                });

            }
        } catch (error) {
            // Error retrieving data
            console.log("Something went wrong", error);
        }
    };

    handleSubmit(event) {
        const {username, uploadFile, ad} = this.state;
        event.preventDefault();

        const data = new FormData()
        data.append('file', uploadFile);
        fetch('http://13.53.200.72:8080/api/ads?userName=' + username + '&ad[carSerialNr]=' + ad.carSerialNr + '&ad[price]=' + ad.price + '&ad[description]=' + ad.description + '&ad[carMark]=' + ad.carMark.carMark, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                data
            })
        })

            .then((response) => response.text())
            .then((responseData) => {
                console.log("RESULTS HERE:", responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._retrieveData();
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ? <Grid container spacing={0} justify="center" direction="row">
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
                                                placeholder={this.state.username}
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                required
                                                autoFocus
                                            />
                                            {this.state.username}
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
                                                onChange={this.handleCarMarkChange}
                                                value={this.state.carMark}
                                                inputProps={{ maxLength: 12 }}
                                                required
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
                                                onChange={this.handleAdChange}
                                                value={this.state.description}
                                                inputProps={{ maxLength: 255 }}
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="number"
                                                placeholder="Hind"
                                                fullWidth
                                                name="price"
                                                variant="outlined"
                                                onChange={this.handleAdChange}
                                                value={this.state.price}
                                                inputProps={{ maxLength: 7 }}
                                                required
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
                                                onChange={this.handleAdChange}
                                                value={this.state.carSerialNr}
                                                inputProps={{ maxLength: 6 }}
                                                required
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
                </Grid> : <LoginPage/>}
            </div>
        );
    }
}
