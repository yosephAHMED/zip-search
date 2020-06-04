import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ZipSearch from './components/ZipSearch';

class App extends Component {
	render() {
		return (
			<div>
				<ZipSearch zipcode="10310"/>
				<ZipSearch zipcode="10002" />
				<ZipSearch zipcode="11220" />
				<ZipSearch zipcode="666666" />
			</div>
		);
	}
}

export default App;			
			