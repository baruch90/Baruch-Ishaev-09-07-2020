import React from 'react';
import './App.css';
import Home from './Containers/Home';
import Background from './imges/pic2.jpg';
var sectionStyle = {
	width: "100%",

	backgroundImage: `url(${Background})`
  };
function App() {
	return (
		<div className="App"style={ sectionStyle } >
			<Home />
		</div>
	);
}

export default App;
