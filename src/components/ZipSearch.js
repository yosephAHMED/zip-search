import React, { Component } from "react";
import axios from "axios";

class ZipSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { zip: null };
    }

    componentDidMount() {
        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.props.zipcode).then((response) => {
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

            this.setState({ zip: newZipSearchObj });
        }).catch((err) => console.log(err));

    }

    render() {
        let display;
        if (!this.state.zip) {
            display = <p>Not Found</p>;
        } else {
            display = (
                <>
                    <h1>{this.state.locationText}</h1>
                    <ul>
                        <li>State: {this.state.zip.stateName}</li>
                        <li>Location: ({this.state.zip.latitude}, {this.state.zip.longitude})</li>
                        <li>Population (estimated): {this.state.zip.population}</li>
                        <li>Total Wages: {this.state.zip.wages}</li>
                    </ul>
                </>
            );
        }
        
        return <div className="zip">{display}</div>;
    }
}

export default ZipSearch;