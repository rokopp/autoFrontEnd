import React from 'react';

import {Grid, Typography, TextField, Button} from "@material-ui/core";
import AsyncStorage  from "@react-native-community/async-storage";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from 'prop-types'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            setOpen: false,
            loggedIn: false,
            error: false
        };

        if(props.error) {
            this.state = {
                failure: 'wrong username or password!',
                errcount: 0
            }
        } else {
            this.state = { errcount: 0 }
        }

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleError = (field, errmsg) => {
        if(!field) return

        if(errmsg) {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount + 1,
                errmsgs: {...prevState.errmsgs, [field]: errmsg}
            }))
        } else {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount===1? 0 : prevState.errcount-1,
                errmsgs: {...prevState.errmsgs, [field]: ''}
            }))
        }
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

        if(!this.state.errcount) {
            const data = new FormData(this.form)
            fetch(this.form.action, {
                method: this.form.method,
                body: new URLSearchParams(data)
            })
                .then(v => {
                    if(v.redirected) window.location = v.url

                })
                .catch(e => console.warn(e))
        }
        if (!this.state.error) {
            this.setState({
                loggedIn: true
            })
            const loginData = JSON.stringify({
                userName: username,
                password: password,
                loggedIn: true
            },)
            this._storeData(loginData)
        }
        // axios.post('http://13.53.200.72:8080/api/login', {bodyData})
        //     .then(response => {
        //         console.log(response);
        //
        //         if (response === 'success') {
        //             const loginData = JSON.stringify({
        //                 userName: username,
        //                 password: password,
        //                 loggedIn: true
        //             },)
        //             this.setState({
        //                 loggedIn: true
        //             })
        //             this._storeData(loginData)
        //         } else {
        //             this.setState({
        //                 error: true
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        // fetch('http://13.53.200.72:8080/api/login', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: bodyData,
        //     withCredentials: true
        // })
        //     .then(res => res.text())
        //     .then(response => {
        //         console.log(response);
        //
        //         if (response === 'success') {
        //             const loginData = JSON.stringify({
        //                 userName: username,
        //                 password: password,
        //                 loggedIn: true
        //             },)
        //             this.setState({
        //                 loggedIn: true
        //             })
        //             this._storeData(loginData)
        //         } else {
        //             this.setState({
        //                 error: true
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

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

    checkForError() {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.get("error") === "true") {
            this.setState(
                {
                    error: true
                }
            )
        }
    }
    componentDidMount() {
        this._retrieveData();
        this.checkForError();
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
                                <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}}>
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
                <Dialog open={setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                { !this.state.loggedIn ? <Grid container spacing={0} justify="center" direction="row">
                </Grid> : <h2>Sisse logitud</h2>}
                </Dialog>
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
