import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";


export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carsList: []
        }
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
        const { carsList } = this.state
        return (
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
        );
    }
}
