import React from 'react';

import {Grid, Typography, TextField, Button} from "@material-ui/core";
import AsyncStorage  from "@react-native-community/async-storage";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false,
            setOpen: false,
            loggedIn: false
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClickOpen() {
        this.setState(
            {setOpen: !this.state.setOpen}
        )
    }

    handleClose(event) {
        this.setState(
            {setOpen: !this.state.setOpen}
        )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const {username, password } = this.state;
        const bodyData = JSON.stringify({
            userName: username,
            password: password,
        },)

        fetch('http://13.48.57.170:8080/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyData,
            withCredentials: true
        })
            .then(res => res.text())
            .then(response => {
                console.log(response);

                if (response === 'success') {
                    const loginData = JSON.stringify({
                        userName: username,
                        password: password,
                        loggedIn: true
                    },)
                    this.setState({
                        loggedIn: true
                    })
                    this._storeData(loginData)
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value))

                this.setState({
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
        const { setOpen } = this.state

        return (
            <div>
                {!this.state.loggedIn ? <IconButton aria-label="search" color="inherit" onClick={this.handleClickOpen}> Logi sisse </IconButton>
                    : <IconButton color="inherit" onClick={this.handleLogOut}> Logi välja </IconButton>}
                <Dialog open={setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                { !this.state.loggedIn ? <Grid container spacing={0} justify="center" direction="row">
                   <DialogContent> <Grid item>
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
                </Grid> : <h2>Sisse logitud</h2>}
                </Dialog>
            </div>
        );
    }
}
