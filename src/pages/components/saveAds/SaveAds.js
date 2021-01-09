import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import AsyncStorage from "@react-native-community/async-storage";
import {SERVER_URL} from "../../../config";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Link} from "react-router-dom";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            uploadFile: [],
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
        const { token } = this.props
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
        data.append("username", userName);
        fetch(SERVER_URL + '/api/user/ads', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: data
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData.status !== 200 || responseData.status !== 400
                    || responseData.status !== 500) {
                    alert("Kuulutuse laetud");
                } else {
                    alert("There was an error!");
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
                                            <input
                                                accept="image/png"
                                                value={this.state.file}
                                                onChange={this.uploadFileChange}
                                                multiple
                                                type="file"
                                                required
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
                </Grid> : <Link to={"/registreeri"}><h3>Loo kasutaja</h3></Link>}
            </div>
        );
    }
}
