import React, {Component} from "react";
import {SERVER_URL} from "../../../config";
import {Button, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default class AddCarMarks extends Component {
    constructor() {
        super();
        this.state = {
            carMark: {
                id: "",
                carMark: ""
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event) {
        const {carMark} = this.state
        event.preventDefault();
        const { token } = this.props
        fetch(SERVER_URL + '/api/admin/carMarks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                carMark: carMark.carMark
            }),
        })

            .then((response) => response.text())
            .then((responseData) => {
                if (responseData === 'Successfully added') {
                    alert("Auto mark lisatud")
                } else {
                    alert(responseData)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleChange(event) {
        this.setState({
            carMark: {...this.state.carMark, [event.target.name]: event.target.value}
        })
    }

    render() {
        const { isAdmin } = this.props
        if (isAdmin) {
            return (
                <div>
                    <h2>Lisa automark</h2>
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
                                                pattern="[A-Z][a-z]* [A-Z][a-z]*"
                                                type="text"
                                                placeholder="Auto Mark"
                                                fullWidth
                                                name="carMark"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.carMark.carMark}
                                                inputProps={{ maxLength: 255 }}
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className="button-block"
                                        >
                                            Salvesta automark
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Admini õigused puuduvad</h2>
                </div>
            )
        }
    }
}
