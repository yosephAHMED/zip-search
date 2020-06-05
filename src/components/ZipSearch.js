import React, { Component } from "react";
import axios from "axios";
import './zipsearch.css';

// bootstrap import below is messing up styling on index
//import 'bootstrap/dist/css/bootstrap.min.css';

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
    }

    get initialState() {
        return {
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
    }

    // can be used to reset all variables to initial state
    resetState() {
        this.setState(this.initialState);
    }

    handleChange(event) {
        // changes state of zipCode according to user input
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            // when zipcode is not 5 numbers long, check if we are displaying any information
            // if we are displaying, stop it by setting conditional rendering variable to false
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
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
                console.log(this.state.population);
            }).catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <>
                <div>
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

                <div className="locationInfo_container">
                    {/* if axios got the data then the information will be displayed, otherwise hide the li info */}
                    {this.state.showInfo ?
                        <div className="locationInfo">
                            <h1>{this.state.locationText}</h1>

                            <ul>
                                {/* {this.state.population ? <li>State: {this.state.stateName}</li> : ""}
                                {this.state.population ? <li>Location: ({this.state.latitude}, {this.state.longitude})</li> : ""} */}

                                <li>State: {this.state.stateName}</li>
                                <li>Location: ({this.state.latitude}, {this.state.longitude})</li>

                                {/* Ternary since some zipcodes were working but had no data for population and wages*/}
                                {this.state.population ? <li>Population (estimated): {this.state.population}</li> : ""}
                                {this.state.wages ? <li>Total Wages: {this.state.wages}</li> : ""}
                            </ul>
                            
                        </div>
                        // axios get condition was not met yet
                        : <p className="p_info">Current zipcode is providing no information</p>
                    }
                </div>

            </>
        );
    }
}

export default ZipSearch;