import React from 'react';
import {Grid, TextField, Button} from "@material-ui/core";

export default class SaveAds extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            uploadFile: null,
            ad: {
                name: "",
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFileChange = this.uploadFileChange.bind(this);
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

    handleSubmit(event) {
        const {username, uploadFile, ad} = this.state;
        event.preventDefault();

        const data = new FormData()
        data.append('file', uploadFile);
        data.append('userName', JSON.stringify(username));
        data.append('ad', JSON.stringify(ad));

        console.log(data.get('file'));
        console.log(data.get('userName'));
        console.log(data.get('ad'));
        fetch('http://localhost:8080/api/ads', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: (data)
        })

            .then((response) => response.text())
            .then((responseData) => {
                console.log("RESULTS HERE:", responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {
        return (
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
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField

                                                type="file"
                                                name="file"
                                                placeholder="file"
                                                value={this.state.file}
                                                onChange={this.uploadFileChange}
                                                required
                                                fullWidth
                                                variant="outlined"
                                                autoFocus
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="ad"
                                                fullWidth
                                                name="ad"
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                value={this.state.ad.name}
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
                </Grid>
            </div>
        );
    }
}
