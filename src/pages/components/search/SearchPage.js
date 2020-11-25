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


export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carsList: [],
            setOpen: false,
            maxPrice: 0,
            minPrice: 0,
            carMarkId: 0,
            carMark: ""
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handlePriceAndCarMark = this.handlePriceAndCarMark.bind(this)

    }

    handlePriceAndCarMark(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    getCarMarkId(carMark) {
        let carMarkIdSetter = 0;
        this.state.carsList.forEach( (item) => {
            if (item.carMark.carMark === carMark) {
                carMarkIdSetter = item.carMark.id;
            }
        })
        this.setState({
            carMarkId: carMarkIdSetter
        })
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
        fetch('http://13.53.200.72:8080/api/ads',
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
        const { carsList, setOpen, minPrice, maxPrice, carMarkId, carMark } = this.state
        let urlPrice = '/otsing/hind/' + minPrice + '/' + maxPrice;
        let urlCarMark = '/otsing/mark/' + carMarkId + '/' + carMark;

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
                                    onChange={(event, value) => {
                                        this.setState(
                                            {
                                                carMark: value
                                            }
                                        )
                                        this.getCarMarkId(value)
                                    }}
                                    options={carsList.map(function (item) {
                                        return item.carMark.carMark
                                    })}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Auto mark"
                                                   margin="normal" variant="outlined" />
                                    )}
                                />
                                <TextField name="minPrice" onChange={this.handlePriceAndCarMark} label="Min Hind" margin="normal" variant="outlined" />
                                <TextField name="maxPrice" onChange={this.handlePriceAndCarMark} label="Max Hind" margin="normal" variant="outlined"/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Sulge
                            </Button>
                            <Button component={Link} to={urlCarMark} onClick={this.handleClose} color="primary">
                                Otsi Auto margi järgi
                            </Button>
                            <Button component={Link} to={urlPrice} onClick={this.handleClose} color="primary">
                                Otsi Hinna järgi
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );
    }
}
