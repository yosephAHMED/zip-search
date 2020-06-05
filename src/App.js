import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ZipSearch from './components/ZipSearch';

class App extends Component {
	render() {
		return (
			<div>
				<ZipSearch zipcode="10310"/>
			</div>
		);
	}
}

export default App;			
			