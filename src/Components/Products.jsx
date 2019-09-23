import React, { Component } from 'react'
import Products from '../data/products.json'
//This is where the products are displayed and filtered
class ProductsPage extends Component {
  //Saving the value of options so that they can be recompared on change of another select. Products in the state so that if the page was made to a certain size and only had part of the products it would rerender if more products were loaded
  state = {
    type: "any",
    brand: "any",
    prices: {
      low: 0,
      high: 50000
    },
    products: Products
  }
//Set state based on the name of the select and the value of the option
  handleChange = e => {    
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
//Get the price and send it to parsePrice
  changePrice = (e) => {
    this.parsePrice(e.target.value)
  }
//Parse the value of price and set state with the two different numbers checking if there is a high by checking the length of of the array with the numbers. If it is less than one then there is no high price and that doesn't need to be compared later so it is set to false
  parsePrice = (value) => {
    let prices = value.split(" ");
    if(prices.length > 1){
      this.setState({
        prices: {
          low: prices[0],
          high: prices[1]
        }
      })
    } else{
      this.setState({
        prices: {
          low: prices[0],
          high: false
        }
      })
    }
  }
//Filter the products with .filter() saving the new array under a common variable that in the end is returned
  filterProducts = (Products, type, brand, prices) => {

    let filteredProducts = Products;

    // Transform Filtered Products based on passed arguments

    // Types
    if(type !== "any"){
      filteredProducts = filteredProducts.filter(product => product.type === type)
    }
    // Brands
    if(brand !== "any"){
      filteredProducts = filteredProducts.filter(product => product.brand === brand)
    }
    // Handle Prices
    if(prices.low) {
      filteredProducts = filteredProducts.filter(product => product.price >= prices.low)
    }
    if(prices.high) {
      filteredProducts = filteredProducts.filter(product => product.price <= prices.high)
    }

    return filteredProducts;
  }

  render() {

    // Get the products off state.
    const { products, type, brand, prices } = this.state;

    // Filter Products by selection
   const filteredProducts = this.filterProducts(products, type, brand, prices)
    // Render Products
    return (
      <div>
        <div className="row mt-3 mb-2">
          <h1 className="col-md-8 col-lg-11 top-page ml-3">Browse Our Guitars!</h1>
          <div >
            <form className="form-inline col-md-8 col-lg-11 top-form">
              <div className="form-group mt-3">
                <select name="type" className="ml-3" id="guitar-type" onChange={this.handleChange}>
                  <option value="any" hidden>Guitar Type:</option>
                  <option value="any">Any</option>
                  <option value="electric">Electric Guitar</option>
                  <option value="acoustic">Acoustic Guitar</option>
                </select>

                <select name="prices" className="ml-3" id="guitar-price" onChange={this.changePrice}>
                  <option value="0 500000" hidden>Price:</option>
                  <option value="0 500000">Any</option>
                  <option value="0 200">Less than $200</option>
                  <option value="200 499">$200-$499</option>
                  <option value="500 999">$500-$999</option>
                  <option value="1000 2999">$1000-$2999</option>
                  <option value="3000 5000">$3000-$5000</option>
                  <option value="5001">More than $5000</option>
                </select>

                <select name="brand" className="ml-3" id="guitar-brand" onChange={this.handleChange}>
                  <option value="any" hidden>Brand:</option>
                  <option value="any">Any</option>
                  <option value="fender">Fender</option>
                  <option value="squier">Squier</option>
                  <option value="epiphone">Epiphone</option>
                  <option value="prs">PRS</option>
                  <option value="ibanez">Ibanez</option>
                  <option value="martin">Martin</option>
                  <option value="ltd">ESP/LTD</option>
                  <option value="taylor">Taylor</option>
                  <option value="dangelico">D'Angelico</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="ernie-ball">Ernie Ball</option>
                </select>

              </div>
            </form>
          </div>
        </div>
        <div className="row products">
          {filteredProducts.length >= 1 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-md-11 col-lg-4 card">
                <img src={product.imgURL} alt={product.imgAlt} className="img card-img-top"></img>
                <div className="card-body">
                  <h3 className="card-header">{product.name}</h3>
                  <p className="card-subtitle">${product.price}</p>
                  <p className="card-text ml-3">{product.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No results found...</p> 
          )}
        </div>
      </div>
    )
  }
}

export default ProductsPage;