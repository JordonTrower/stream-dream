import React from "react";
import Routes from "./routes";
import Header from "./Nav/Header";
import Sidebar from "./Nav/Sidebar";

function App() {
	return (
		<div className="App">
			<Header />
			<Sidebar />
			<Routes />
		</div>
	);
}

export default App;
