import React from 'react';

import AsyncStorage  from "@react-native-community/async-storage";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from 'prop-types';
import LoginInput from "./LoginInput";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
        };
        if(props.error) {
            this.state = {
                failure: 'Vale kasutajanimi/parool',
                errcount: 0,
            }
        } else {
            this.state = {
                errcount: 0,
            }
        }

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure
                || Object.values(this.state.errmsgs).find(v=>v)
            return <div className="error">{errmsg}</div>
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    storeUser(url) {
        if (url.includes("admin")) {
            const {username, password} = this.state;

            this.setState({
                loggedIn: true
            })
            const loginData = JSON.stringify({
                userName: username,
                password: password,
                loggedIn: true,
            },)
            this._storeData(loginData)
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.errcount) {
            const data = new FormData(this.form)
            fetch(this.form.action, {
                method: this.form.method,
                body: new URLSearchParams(data)
            })
                .then(v => {
                    this.storeUser(v.url);
                    if(v.redirected) window.location = v.url
                })
                .catch(e => console.warn(e))
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!

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
        const inputs = this.props.inputs.map(
            ({name, placeholder, type, value, className}, index) => (
                <LoginInput key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={type==='submit'? className : ''} />
            )
        )
        const errors = this.renderError()
        console.log(this.state.loggedIn)
        return (
            <div>
                {!this.state.loggedIn ?
                    <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
                        {inputs}
                        {errors}
                    </form> :
                    <IconButton color="inherit" onClick={this.handleLogOut}> Logi välja </IconButton>}

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
