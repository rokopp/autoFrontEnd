import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import SearchIcon from '@material-ui/icons/Search';
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carsList: [],
            setOpen: false,
            searchingFor: false,
            maxPrice: 0,
            minPrice: 0
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePrice = this.handlePrice.bind(this)

    }

    handlePrice(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
        console.log(this.state.minPrice)
    }

    handleChange(event) {
        if (event.target.value !== "price") {
            this.setState(
                {searchingFor: !this.state.searchingFor}
            )
        } else {
            this.setState(
                {searchingFor: !this.state.searchingFor}
            )
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

    componentDidMount(){
        fetch('http://localhost:8080/api/ads',
            {
                method: 'GET'
            })
            .then(res => res.json())
            .then(response => {
                this.setState({carsList: response})
            })
            .catch(error => {
                console.log(error)
            });
    }





    render() {
        const { carsList, setOpen, searchingFor, minPrice, maxPrice } = this.state
        let url = '/otsing/' + minPrice + '/' + maxPrice;
        return (
                <div>
                    <IconButton aria-label="search" color="inherit" onClick={this.handleClickOpen}>
                        <SearchIcon />
                    </IconButton>
                    <Dialog open={setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Otsing</DialogTitle>
                        <DialogContent>
                            <div style={{ width: 300 }}>
                                <Autocomplete
                                    id="search"
                                    freeSolo
                                    options={carsList.map(function (item) {
                                        return item.carMark.carMark
                                    })}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Auto mark"
                                                   margin="normal" variant="outlined" />
                                    )}
                                />
                                <TextField name="minPrice" onChange={this.handlePrice} label="Min Hind" margin="normal" variant="outlined" />
                                <TextField name="maxPrice" onChange={this.handlePrice} label="Max Hind" margin="normal" variant="outlined"/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Sulge
                            </Button>
                            <Button component={Link} to={url} onClick={this.handleClose} color="primary">
                                Otsi
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );
    }
}
