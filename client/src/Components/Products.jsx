import React, { Component } from "react";
//This is where the products are displayed and filtered
class ProductsPage extends Component {
  //Saving the value of options so that they can be recompared on change of another select. Products in the state so that if the page was made to a certain size and only had part of the products it would rerender if more products were loaded
  state = {
    type: "any",
    brand: "any",
    prices: {
      low: "any",
      high: "any"
    },
    products: []
  };

  componentDidMount() {
    fetch("/api/products", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.brand !== this.state.brand ||
      prevState.type !== this.state.type ||
      prevState.prices.low !== this.state.prices.low ||
      prevState.prices.high !== this.state.prices.high
    ) {
      fetch(
        `/api/products/filter/${this.state.type}/${this.state.brand}/${this.state.prices.low}/${this.state.prices.high}`,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ products: data });
        });
    }
  }

  //Set state based on the name of the select and the value of the option
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //Get the price and send it to parsePrice
  changePrice = e => {
    this.parsePrice(e.target.value);
  };
  //Parse the value of price and set state with the two different numbers checking if there is a high by checking the length of of the array with the numbers. If it is less than one then there is no high price and that doesn't need to be compared later so it is set to false
  parsePrice = value => {
    let prices = value.split(" ");
    if (prices.length > 1) {
      this.setState({
        prices: {
          low: prices[0],
          high: prices[1]
        }
      });
    } else {
      this.setState({
        prices: {
          low: prices[0],
          high: 50000
        }
      });
    }
  };

  render() {
    // Get the products off state.
    const { products } = this.state;

    // Render Products
    return (
      <div className="product-container">
        <div className="row mt-3 mb-2">
          <h1 className="page-header ml-3 top-page">Browse Our Guitars!</h1>
          <div>
            <form className="form-inline top-page col-md-8 col-lg-11">
              <div className="form-group">
                <select
                  name="type"
                  className="ml-3 form-control product-select"
                  id="guitar-type"
                  onChange={this.handleChange}
                >
                  <option value="any" hidden>
                    Guitar Type:
                  </option>
                  <option value="any">Any</option>
                  <option value="electric">Electric Guitar</option>
                  <option value="acoustic">Acoustic Guitar</option>
                </select>

                <select
                  name="prices"
                  className="ml-3 form-control product-select"
                  id="guitar-price"
                  onChange={this.changePrice}
                >
                  <option value="0 500000" hidden>
                    Price:
                  </option>
                  <option value="0 500000">Any</option>
                  <option value="0 199.99">Less than $200</option>
                  <option value="200 499.99">$200-$499</option>
                  <option value="500 999.99">$500-$999</option>
                  <option value="1000 2999.99">$1000-$2999</option>
                  <option value="3000 5000.99">$3000-$5000</option>
                  <option value="5001">More than $5000</option>
                </select>

                <select
                  name="brand"
                  className="ml-3 form-control product-select"
                  id="guitar-brand"
                  onChange={this.handleChange}
                >
                  <option value="any" hidden>
                    Brand:
                  </option>
                  <option value="any">Any</option>
                  <option value="fender">Fender</option>
                  <option value="squier">Squier</option>
                  <option value="epiphone">Epiphone</option>
                  <option value="prs">PRS</option>
                  <option value="ibanez">Ibanez</option>
                  <option value="martin">Martin</option>
                  <option value="ltd">ESP/LTD</option>
                  <option value="taylor">Taylor</option>
                  <option value="d'angelico">D'Angelico</option>
                  <option value="yamaha">Yamaha</option>
                  <option value="ernie-ball">Ernie Ball</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="row products">
          {products.length >= 1 ? (
            products.map(product => (
              <div key={product.product_id} className="product-box">
                <img
                  src={product.img_url}
                  alt={product.img_alt}
                  className="img card-img-top"
                ></img>
                <div className="card-body">
                  <h3 className="card-header">{product.product_name}</h3>
                  <p className="card-subtitle">${product.price}</p>
                  <p className="card-text ml-3">{product.product_details}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No results found...</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProductsPage;
