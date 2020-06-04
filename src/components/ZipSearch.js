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

            // showInfo is used in conditional rendering
            showInfo: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // changes state of zipCode according to user input
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            // do nothing when zipCode is not 5 characters long (for performance)
        } 
        else {    
            // when zipCode input is 5 characters, run the request
            axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
                const data = response.data;

                console.log(data);

                // object to hold all the new assignments from API
                const newZipSearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    locationText: data[0].LocationText,
                    latitude: data[0].Lat,
                    longitude: data[0].Long,
                    population: data[0].EstimatedPopulation,
                    wages: data[0].TotalWages,
                    showInfo: true,
                };

                // changing state of variables according to API data
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

                {/* User input box for zipcode. Each entry triggers a state change */}
                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="10310"
                    onChange={this.handleChange.bind(this)}
                />

                <div className="locationInfo">
                    {/* if axios got the data then the information will be displayed, otherwise hide the li info */}
                    {this.state.showInfo ?
                        <div>
                            <h1>{this.state.locationText}</h1>
                            <ul>
                                <li>State: {this.state.stateName}</li>
                                <li>Location: ({this.state.latitude}, {this.state.longitude})</li>
                                <li>Population (estimated): {this.state.population}</li>
                                <li>Total Wages: {this.state.wages}</li>
                            </ul>
                        </div>
                        // axios get condition was not met yet
                        : <p>Current Zipcode is providing no information</p>
                    }
                </div>

            </>
        );
    }
}

export default ZipSearch;