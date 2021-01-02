import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import {SERVER_URL} from "../../../config";

export class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            phoneNumber: "",
            loggedIn: false,
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const {username, password, email, phoneNumber} = this.state;
        event.preventDefault();
        fetch(SERVER_URL + '/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber
            }),
            withCredentials: true
        })

            .then((response) => response.text())
            .then((responseData) => {
                if (responseData === 'success') {
                    this.setState({loggedIn: true});
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render() {
        return (
        <div>

            { !this.state.loggedIn ? <Grid container spacing={0} justify="center" direction="row">
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
                                            placeholder="Kasutajanimi"
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

                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            autoFocus
                                            helperText={this.state.error ? 'Error' : ''}
                                            error={this.state.error}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField

                                            type="text"
                                            name="phoneNumber"
                                            placeholder="Tel Number"
                                            value={this.state.phoneNumber}
                                            onChange={this.handleChange}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            autoFocus
                                            helperText={this.state.error ? 'Error' : ''}
                                            error={this.state.error}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            type="password"
                                            placeholder="Parool"
                                            fullWidth
                                            name="password"
                                            variant="outlined"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                            helperText={this.state.error ? 'Error' : ''}
                                            error={this.state.error}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className="button-block"
                                        >
                                            Registreeri
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> : <h2>Registreerimine õnnestus</h2>}
        </div>
        );
    };
};
