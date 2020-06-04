import React, { Component } from "react";
import axios from "axios";

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = {
            // variables that we will assign from API
            zipCode: "",
            stateName: "",
            cityName: "",
            locationText: "",
            latitude: "",
            longitude: "",
            population: "",
            wages: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            // do nothing when zipCode is not 5 characters long (for performance)
        } else {
            axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
                const data = response.data;

                console.log(data);

                const newZipSearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    locationText: data[0].LocationText,
                    latitude: data[0].Lat,
                    longitude: data[0].Long,
                    population: data[0].EstimatedPopulation,
                    wages: data[0].TotalWages,
                };

                this.setState(newZipSearchObj);
            }).catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <>
                <div className="zipcode">
                    <h2>Zipcode</h2>
                </div>
                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="10310"
                    onChange={this.handleChange.bind(this)}
                />

                <>
                    <h1>{this.state.locationText}</h1>
                    <ul>
                        <li>State: {this.state.stateName}</li>
                        <li>Location: ({this.state.latitude}, {this.state.longitude})</li>
                        <li>Population (estimated): {this.state.population}</li>
                        <li>Total Wages: {this.state.wages}</li>
                    </ul>
                </>

            </>
        );
    }
}

export default ZipSearch;