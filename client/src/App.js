import React from "react";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Bringing together the necessary components to display page
const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <Footer />
    </React.Fragment>
  );
};

export default App;
