import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default class AdminPage extends Component {

    render() {
        const { isAdmin } = this.props
        return (
            <div>
                {isAdmin ?
                <Grid container>
                    <Grid item>
                        <h1>Administraator</h1>
                    </Grid>
                    <Grid item>
                        <Link to=""></Link>
                    </Grid>
                    <Grid item>
                        <Link to=""></Link>
                    </Grid>
                    <Grid item>
                        <Link to=""></Link>
                    </Grid>
                </Grid> :
                    <h1>Puuduvad Admin õigused</h1>
                    }
            </div>
        )
    }
}
