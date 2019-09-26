import React from 'react';
import ProductsPage from './Products'
import Home from './Home'
import Contact from './Contact'
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
//Component for displaying the different components (home, products, contact)
const Nav = () => {
    return(
        //To use react-router-dom you have to wrap the code for the links in <BrowserRouter>
<BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <img src="https://static.vecteezy.com/system/resources/previews/000/344/259/non_2x/hummingbird-logo-illustration-of-a-bird-species-violetears-colibri-flat-vector-drawing-of-an-animal-fly.jpg" alt="Hummingbird Logo" className="logo nav-logo"></img>
          <span className="navbar-brand mb-1 ml-2 h1 nav-title">Hummingbird Guitars</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                  {/* Using <NavLink> to be able to target avtive for a more user friendly active page different color button */}
                <NavLink exact className="btn text-white nav-btn-left" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact  className="btn text-white nav-btn-middle" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact className="btn text-white nav-btn-right" to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* This is where the routing paths are determined */}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/products" component={ProductsPage}/>
          <Route exact path="/contact" component={Contact}/>
        </Switch>
    </BrowserRouter>
    )
}

export default Nav;