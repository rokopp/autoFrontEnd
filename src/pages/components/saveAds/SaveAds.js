import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import AsyncStorage from "@react-native-community/async-storage";
import LoginPage from "../login/LoginPage";
import {SERVER_URL} from "../../../config";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
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
                const password = JSON.parse(value).password;

                this.setState({
                    loggedIn: true,
                    userName: username,
                    password: password
                });

            }
        } catch (error) {
            // Error retrieving data
            console.log("Something went wrong", error);
        }
    };

    handleSubmit(event) {
        const {username, password, uploadFile, ad} = this.state;
        event.preventDefault();
        const data = new FormData()
        data.append('picture', uploadFile);
        data.append("ad", new Blob([JSON.stringify({
            "carMark": {
                "id": ad.carMark.id,
                "carMark": ad.carMark.carMark
            },
            "description": ad.description,
            "price": ad.price,
            "carSerialNr": ad.carSerialNr
        })], {
            type: "application/json"
        }));
        // data.append("principal", new Blob([JSON.stringify({
        //     "username": "aaa"
        // })], {
        //     type: "application/json"
        // }));
        fetch(SERVER_URL + '/api/ads' + '?principal', {
            method: 'POST',
            body: data
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData.status !== 200) {
                    alert("There was an error!");
                } else {
                    alert("Request successful");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("Login " + window.btoa(username + ":" + password))
    }

    getCarMarks() {
        fetch(SERVER_URL + '/api/carMarks', {
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
        let carMarkSetter = "";
        this.state.carMarkList.forEach( (item) => {
            if (item.carMark === carMark) {
                carMarkIdSetter = item.id;
                carMarkSetter = item.carMark
            }
        })
        this.setState({
            ad: {
                carMark: {
                    id: carMarkIdSetter,
                    carMark: carMarkSetter
                }
            }
        })
    }

    componentDidMount() {
        this._retrieveData();
        this.getCarMarks();
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
                                <h4>Kasutaja: </h4><h3>{this.state.userName}</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            {this.state.userName}
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
