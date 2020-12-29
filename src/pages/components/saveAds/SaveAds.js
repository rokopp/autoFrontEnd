import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import AsyncStorage from "@react-native-community/async-storage";
import LoginPage from "../login/LoginPage";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            uploadFile: null,
            ad: {
                carMark: {
                    id: "",
                    carMark: ""
                },
                description: "",
                price: 0,
                carSerialNr: ""
            },
            loggedIn: false,
            carMarkList: []
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

                const username = JSON.parse(value).userName;
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
        const {userName, uploadFile, ad} = this.state;
        event.preventDefault();

        console.log(ad)

        const data = new FormData()
        data.append('file', uploadFile);
        const parameterData = "carMark=" + ad.carMark.id + "&description=" + ad.description +
            "&carSerialNr=" + ad.carSerialNr + "&price=" + ad.price;
        fetch('http://localhost:8080/api/ads?userName=' + userName + "&" + parameterData, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })

            .then((response) => response.text())
            .then((responseData) => {
                console.log("RESULTS HERE:", responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCarMarks() {
        fetch('http://localhost:8080/api/carMarks', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then((response) => response.text())
            .then((responseData) => {
                this.setState({
                    carMarkList: JSON.parse(responseData)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getCarMarkId(carMark) {
        let carMarkIdSetter = 0;
        this.state.carMarkList.forEach( (item) => {
            if (item.carMark === carMark) {
                carMarkIdSetter = item.id;
            }
        })
        this.setState({
            ad: {
                carMark: {
                    id: carMarkIdSetter
                }
            }
        })
    }
    componentDidMount() {
        // this.getCarMarks();
        this._retrieveData();
    }

    render() {
        const { carMarkList } = this.state

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
                                            <h4>Kasutaja: </h4><h3>{this.state.userName}</h3>
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
                                            <Autocomplete
                                                freeSolo
                                                onChange={(event, value) => {
                                                    this.setState(
                                                        {
                                                            carMark: value
                                                        }
                                                    )
                                                    this.getCarMarkId(value)
                                                }}
                                                options={carMarkList.map(function (item) {
                                                    return item.carMark
                                                })}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Auto mark"
                                                               margin="normal" variant="outlined" />
                                                )}
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
