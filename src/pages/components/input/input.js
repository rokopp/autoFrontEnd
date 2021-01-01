import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: props.value? props.value : '',
            className: props.className? props.className : '',
            error: false
        }
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render () {
        const {handleError, ...opts} = this.props
        this.handleError = handleError
        console.log(handleError)
        return (
            <input {...opts} value={this.state.value}
                   onChange={this.handleChange} className={this.state.className} />
        )
    }
}

Input.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    handleError: PropTypes.func
}

export default Input
