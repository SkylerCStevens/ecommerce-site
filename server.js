const express = require('express')//Import express
const mysql = require('mysql')//Import mysql
const path = require('path')//Import path from node
const helmet = require('helmet')//Import helmet
const morgan = require('morgan')//Import morgan
require('dotenv').config()//Import dotenv.config

const app = express() //Save the object returned from express()
const port = process.env.PORT || 3001 //Set the port variable to be equal to system defined port or 3001

//Prevent default powered by header for node from appearing so that hackers can't easily know what security defects to exploit
app.use(helmet.hidePoweredBy())
//Prevent site from being used for a frame which can be used to make users they are using a site they are not. Deny allows no one to use the site as a frame. sameorgin or allow-from can set different permissions.
app.use(helmet.frameguard({action: 'deny'}))
//Sets "X-XSS-Protection: 1; mode=block" helps prevent reflective xss attacks. Which means adding script tags into the url of a page. It is not used for older versions of internet explorer because it can cause worse security issues
app.use(helmet.xssFilter())
//Sets "X-Content-Type-Options: nosniff". This prevents a file that says it has one content type from having different content that the browser may sense and use instead.
app.use(helmet.noSniff())
// Sets "X-Download-Options: noopen". This prevents someone from adding a malicious HTML file to the site that could be downloaded by older versions of internet explorer and run.
app.use(helmet.ieNoOpen())
//Used for put and post requests where server must accept the data
app.use(express.json()) //recognizes that an incoming request object is a JSON object
app.use(express.urlencoded()) //Recognizes that an incoming request object is a string or an array
//Logs information about server requests. The 'dev' format color codes the status codes as well for clear reading during development
app.use(morgan('dev'))


//Check if the project is in production or development. If it is production then it will run the static build file.
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

//Create a connection with the mySQL databse
var connection = mysql.createConnection({
    //Host name
    host: "localhost",
  
    //Port number default is 3306
    port: 3306,
  
    // MySQL username
    user: "root",
  
    // MySQL password saved in another file for security reasons
    password: process.env.MYPASSWORD,

    //Databse name
    database: "hummingbird_guitars_db"
});

//Connect to database and print dB connected if succesful otherwise throw an error
connection.connect(function(err) {
    if (err) throw err;
    console.log("dB connected")
})

//On the root route send the user to the index.html page
//http://localhost:3000/
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//Execute a query to get all the info needed from the tables to have brand and price included with product info
//http://localhost:3000/api/products
app.get('/api/products', (req, res) => {
    connection.query("SELECT products.product_id, brands.brand_name, products.product_name, products.product_details, products.img_url, products.img_alt, products.guitar_type, prices.price FROM products JOIN brands ON products.brand_id = brands.brand_id JOIN prices ON products.price_id = prices.price_id ORDER BY products.product_id;", (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
})

//Execute a query to get all the data from the contacts table
//http://localhost:3000/contacts
app.get('/api/contacts', (req, res) => {
    connection.query("SELECT * FROM contacts ORDER BY contact_id", (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })
})

//http://localhost:3000/api/products/filter/electric/fender/900/1000
app.get('/api/products/filter/:type/:brand/:pricelow/:pricehigh', (req,res) => {
    const type = req.params.type//define req.params.type passed through url as type
    const brand = req.params.brand//define req.params.brand passed through url as brand
    const priceLow = req.params.pricelow//define req.params.pricelow passed through url as priceLow
    const priceHigh = req.params.pricehigh//define req.params.pricehigh passed through url as priceHigh
    const ANY = "any"// define ANY for easy reassignment if that value gets changed on the page
    let paramArr = []//Create a redefinable variable paramArr with an empty array to be able to add to below with the values of the req.params
    let qryStr = `SELECT products.product_id, brands.brand_name AS brand, products.product_name, products.product_details, products.img_url, products.img_alt, products.guitar_type AS type, prices.price AS price FROM products JOIN brands ON products.brand_id = brands.brand_id JOIN prices ON products.price_id = prices.price_id `//Query string that will be added to based on the conditions below and then passed in the connection.query

    if(brand!==ANY){
        //If brand does not equal ANY check if the paramArr array has anything in it if it is empty define qryStr a string with WHERE otherwise define it as  a string with &&
        if(paramArr.length < 0){
            qryStr = `${qryStr} WHERE  brands.brand_name = ?`
        }
        else{
            qryStr = `${qryStr} && brands.brand_name = ?`
        }
        paramArr = [...paramArr, brand]; //Spread operator to redefine paramArr with what was already in the array and add brand
    }
    if(type!==ANY){
        if(paramArr.length < 0){
            qryStr = `${qryStr} WHERE products.guitar_type = ?`
        }
        else{
            qryStr = `${qryStr} && products.guitar_type = ?`
        }
        paramArr = [...paramArr, type]; //Add type to array
    }
    if(priceLow!==ANY){
        if(paramArr.length < 0){
            qryStr = `${qryStr} WHERE price BETWEEN ? AND ?`
        }
        else{
            qryStr = `${qryStr} && price BETWEEN ? AND ?`
        }
        paramArr = [...paramArr, priceLow, priceHigh]; //Add priceLow and priceHigh to array
    }

    connection.query(qryStr, paramArr, (err, result) => {
        if(err) console.log(err)
        res.send(result)
    })
    
})

app.get('*', (req, res) => {
    res.status(404).send("404 Page not found!")
})


//Create endpoints

app.listen(port, console.log(`Server listening on port: ${port}`)) 