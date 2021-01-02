import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Typography, TextField, Button} from "@material-ui/core";


class LoginInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: props.value? props.value : '',
            className: props.className? props.className : '',
            error: false
        }
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(event) {
        this.setState({
            value: event.target.value,
        })
    }

    render () {
        const { ...opts} = this.props
        return (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        {...opts}
                        value={this.state.value}
                        onChange={this.inputChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        )
    }


}

LoginInput.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string
}

export default LoginInput
