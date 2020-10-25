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
            searchSelected: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
        console.log(this.state.searchSelected)
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/ads',
            {
                method: 'GET'
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({carsList: response})
            })
            .catch(error => {
                console.log(error)
            });
    }





    render() {
        const { carsList, setOpen, searchingFor } = this.state
        return (
                <div>
                    <IconButton aria-label="search" color="inherit" onClick={this.handleClickOpen}>
                        <SearchIcon />
                    </IconButton>
                    <Dialog open={setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Otsing</DialogTitle>
                        <DialogContent>
                            <div>
                                <FormControl style={{minWidth: 140}}>
                                    <InputLabel id="filter" >Filter</InputLabel>
                                    <Select
                                        id="filter"
                                        onChange={this.handleChange}
                                        label='Automark'
                                    >
                                        <MenuItem selected={true} value="carMark">Automark</MenuItem>
                                        <MenuItem value="price">Hind</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ width: 300 }}>
                                <Autocomplete
                                    id="search"
                                    freeSolo
                                    onChange={(event, value) => this.setState({searchSelected: value})}
                                    options={carsList.map(function (item) {
                                        return searchingFor ? item.carMark.carMark : item.price.toString()
                                    })}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Otsing"
                                                   margin="normal" variant="outlined" />
                                    )}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Sulge
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Otsi
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );
    }
}
