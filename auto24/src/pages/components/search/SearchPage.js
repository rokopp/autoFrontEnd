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


export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carsList: [],
            setOpen: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }

    handleClickOpen() {
        this.setState(
            {setOpen: !this.state.setOpen}
        )
    }

    handleClose() {
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
        const { carsList, setOpen } = this.state
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
                                    options={carsList.map((item) => item.carMark.carMark)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Otsing" margin="normal" variant="outlined" />
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
