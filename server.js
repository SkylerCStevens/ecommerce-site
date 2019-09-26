const express = require('express')
const mysql = require('mysql')
//const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

//app.use(cors({origin: 'http://localhost:3000'}))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
  }


var connection = mysql.createConnection({
    //host name
    host: "localhost",
  
    //Port # default is 3306
    port: 3306,
  
    // MySQL username
    user: "root",
  
    // MySQL password
    password: process.env.MYPASSWORD,
    database: "hummingbird_guitars_db"
});
//Connect to database
connection.connect(function(err) {
    if (err) throw err;
    console.log("dB connected")
})


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.get('/api/products', (req, res) => {
    connection.query("SELECT products.product_id, brands.brand_name, products.product_name, products.product_details, products.img_url, products.img_alt, products.guitar_type, prices.price FROM products JOIN brands ON products.brand_id = brands.brand_id JOIN prices ON products.price_id = prices.price_id ORDER BY products.product_id;", (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
})

app.get('/api/contacts', (req, res) => {
    connection.query("SELECT * FROM contacts", (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
})

app.get('/api/productfilter/:query', (req, res) => {
    const qryStr = req.params.query
    connection.query(qryStr, (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
})

app.get('*', (req, res) => {
    res.status(404).send("404 Page not found!")
})


//Create endpoints

app.listen(port, console.log(`Server listening on port: ${port}`)) 