import React from 'react';

import AsyncStorage  from "@react-native-community/async-storage";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from 'prop-types';
import {SERVER_URL} from "../../../config";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            token: "",
            error: false,
            isAdmin: false
        };

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        fetch(SERVER_URL + '/api/login?username=' + username + "&password=" + password, {
            method: 'GET'
        })
            .then((response) => response.text())
            .then((responseData) => {
                if (responseData.length > 0) {
                    const myObject = JSON.parse(responseData);
                    let isAdmin = false
                    if (myObject.role.includes("ADMIN")) {
                        isAdmin = true;
                    }
                    this.setState({
                        token: myObject.token,
                        loggedIn: true,
                        isAdmin: isAdmin
                    })
                    const loginData = JSON.stringify({
                        userName: username,
                        loggedIn: true,
                        token: myObject.token,
                        isAdmin: isAdmin
                    },)
                    this._storeData(loginData)
                } else {
                    this.setState({
                        error: true,
                        loggedIn: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                const username = JSON.parse(value).userName;
                const token = JSON.parse(value).token;

                this.setState({
                    username: username,
                    token: token,
                    loggedIn: true
                });

            }
        } catch (error) {
            // Error retrieving data
            console.log("Something went wrong", error);
        }
    };

    componentDidMount() {
        this._retrieveData();
    }

    _storeData = async (user) => {
        try {
            await AsyncStorage.setItem(
                'userData',
                user
            );
            console.log(user)
        } catch (error) {
            // Error saving data
            console.log("Something went wrong", error);
        }
    };

    handleLogOut() {
        this.setState({loggedIn: false})
        this._removeSession();
        window.location.reload();
    }

    _removeSession = async () => {
        try {
            await AsyncStorage.removeItem("userData");
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    render() {
        return (
            <div>
                {!this.state.loggedIn ? <DialogContent>
                        <Grid item>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                spacing={2}
                                className="login-form"
                            >
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        Logi sisse
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit={this.handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    type="text"
                                                    placeholder="Username"
                                                    fullWidth
                                                    name="username"
                                                    variant="outlined"
                                                    value={this.state.username}
                                                    onChange={this.handleChange}
                                                    helperText={this.state.error ? 'Error' : ''}
                                                    error={this.state.error}
                                                    required
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type="password"
                                                    placeholder="Password"
                                                    fullWidth
                                                    name="password"
                                                    variant="outlined"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    helperText={this.state.error ? 'Error' : ''}
                                                    error={this.state.error}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Logi sisse
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    : <IconButton color="inherit" onClick={this.handleLogOut}> Logi välja </IconButton>}

            </div>
        );
    }
}

LoginPage.propTypes = {
    name: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    inputs: PropTypes.array,
    error: PropTypes.string
}
