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

            const newZipSearchObj = {
                // assign in here
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
                    <ul>

                    </ul>
                </>
            );
        }
        
        return <div className="zip">{display}</div>;
    }
}

export default ZipSearch;