import React, { Component } from "react";
import axios from "axios";

class ZipSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { zip: null };
    }

    componentDidMount() {
        console.log(this.state.zipcode);
        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.props.zipcode).then((response) => {
            const data = response.data;

            const newZipSearchObj = {
                stateName: data.State,
                cityName: data.City,
                locationText: data.LocationText,
                latitude: data.Lat,
                longitude: data.Long,
                population: data.EstimatedPopulation,
                wages: data.TotalWages,
            };

            this.setState({ zip: newZipSearchObj });
        }).catch((err) => console.log(err));

    }

    render() {
        let display;
        if (!this.state.zip) {
            display = <p></p>;
        } else {
            display = (
                <>
                    <h1>{this.state.locationText}</h1>
                    <ul>
                        <li>State: {this.state.stateName}</li>
                        <li>Location: ({this.state.latitude}, {this.state.longitude})</li>
                        <li>Population (estimated): {this.state.population}</li>
                        <li>Total Wages: {this.state.wages}</li>
                    </ul>
                </>
            );
        }
        
        return <div className="zip">{display}</div>;
    }
}

export default ZipSearch;