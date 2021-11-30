import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import store from "./redux/store";

const App = () => {
	return (
		<Provider store={store}>
			<Header />
			<Main />

			<Footer />
		</Provider>
	);
};

export default App;
