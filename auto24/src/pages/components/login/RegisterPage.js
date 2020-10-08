import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";
import axios from 'axios';



export class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            phoneNumber: ""
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

        axios.post("http://localhost:8080/api/registerAccount", {
                username: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber
            },
            {withCredentials: true}) // it says to api it's okay to save cookie
            .then(response => {
                console.log("reg user", response);
            })
            .catch(error => {
                console.log("error reg", error);
            })
        event.preventDefault(); // don't want to perform as html
    }

    render() {
        return (
           /* <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           name="username"
                           placeholder="Username"
                           value={this.state.username}
                           onChange={this.handleChange}
                           required
                    />

                    <input type="email"
                           name="email"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           required
                    />

                    <input type="text"
                           name="phonenumber"
                           placeholder="Tel Number"
                           value={this.state.phoneNumber}
                           onChange={this.handleChange}
                           required
                    />

                    <input type="password"
                           name="password"
                           placeholder="Parool"
                           value={this.state.password}
                           onChange={this.handleChange}
                           required
                    />

                    <button type="submit">Registreeri</button>
                </form>
            </div>

            */

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
                                            placeholder="Username"
                                            fullWidth
                                            name="username"
                                            variant="outlined"
                                            value={this.state.username}
                                            onChange={this.handleChange}
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
            </Grid>
        </div>
        );
    };
};
