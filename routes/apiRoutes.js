const mysql = require("mysql"); //Import mysql
const router = require("express").Router();

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
  console.log("dB connected");
});

//Execute a query to get all the info needed from the tables to have brand and price included with product info
//http://localhost:4000/api/products
router.get("/products", (req, res) => {
  connection.query(
    "SELECT products.product_id, brands.brand_name, products.product_name, products.product_details, products.img_url, products.img_alt, products.guitar_type, prices.price FROM products JOIN brands ON products.brand_id = brands.brand_id JOIN prices ON products.price_id = prices.price_id ORDER BY products.product_id;",
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

//Execute a query to get all the data from the contacts table
//http://localhost:4000/contacts
router.get("/contacts", (req, res) => {
  connection.query(
    "SELECT * FROM contacts ORDER BY contact_id DESC",
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

//http://localhost:4000/api/products/filter/electric/fender/900/1000
router.get("/products/filter/:type/:brand/:pricelow/:pricehigh", (req, res) => {
  const type = req.params.type; //define req.params.type passed through url as type
  const brand = req.params.brand; //define req.params.brand passed through url as brand
  const priceLow = req.params.pricelow; //define req.params.pricelow passed through url as priceLow
  const priceHigh = req.params.pricehigh; //define req.params.pricehigh passed through url as priceHigh
  const ANY = "any"; // define ANY for easy reassignment if that value gets changed on the page
  let paramArr = []; //Create a redefinable variable paramArr with an empty array to be able to add to below with the values of the req.params
  let qryStr = `SELECT products.product_id, brands.brand_name AS brand, products.product_name, products.product_details, products.img_url, products.img_alt, products.guitar_type AS type, prices.price AS price FROM products JOIN brands ON products.brand_id = brands.brand_id JOIN prices ON products.price_id = prices.price_id `; //Query string that will be added to based on the conditions below and then passed in the connection.query

  if (brand !== ANY) {
    //If brand does not equal ANY check if the paramArr array has anything in it if it is empty define qryStr a string with WHERE otherwise define it as  a string with &&
    if (paramArr.length < 0) {
      qryStr = `${qryStr} WHERE  brands.brand_name = ?`;
    } else {
      qryStr = `${qryStr} && brands.brand_name = ?`;
    }
    paramArr = [...paramArr, brand]; //Spread operator to redefine paramArr with what was already in the array and add brand
  }
  if (type !== ANY) {
    if (paramArr.length < 0) {
      qryStr = `${qryStr} WHERE products.guitar_type = ?`;
    } else {
      qryStr = `${qryStr} && products.guitar_type = ?`;
    }
    paramArr = [...paramArr, type]; //Add type to array
  }
  if (priceLow !== ANY) {
    if (paramArr.length < 0) {
      qryStr = `${qryStr} WHERE price BETWEEN ? AND ?`;
    } else {
      qryStr = `${qryStr} && price BETWEEN ? AND ?`;
    }
    paramArr = [...paramArr, priceLow, priceHigh]; //Add priceLow and priceHigh to array
  }
  qryStr = `${qryStr} ORDER BY products.product_id`;
  //Connect to mySQL database and send the qryStr passing in the paramArr for what to filter for and send the result as a response
  connection.query(qryStr, paramArr, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//Save new contact from the comment form to database
//http://localhost:4000/api/contacts/new
router.post("/contacts/new", (req, res) => {
  //Assign the req.body elements to variables to decrease length
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const comment = req.body.comment;
  //Backup backend validation for all the fields that the client should include in the new contact
  if (
    !firstName ||
    firstName.length < 2 ||
    firstName.length > 50 ||
    !lastName ||
    lastName.length < 2 ||
    lastName.length > 50 ||
    !email ||
    email.length < 5 ||
    email.length > 100 ||
    !comment ||
    comment.length < 5 ||
    comment.length > 255
  ) {
    //If anything fails validation it sends a 400 status
    return res
      .status(400)
      .send(
        "You must enter a first name, last name, email and comment. Names must be at least 2 characters, email and comments must be at least 5 characters long. Names cannot be longer than 50 characters, emails cannot be longer than 100 characters and comments cannot be longer than 255 characters."
      );
    //If it passes validation insert into the database
  } else {
    connection.query(
      `INSERT INTO contacts (firstname, lastname, email_address, user_message)
      VALUES("${firstName}", "${lastName}", "${email}", "${comment}")`,
      (err, response) => {
        if (err) console.log(err);
        connection.query(
          "SELECT * FROM contacts ORDER BY contact_id DESC",
          (err, result) => {
            if (err) console.log(err);
            res.send(result);
          }
        );
      }
    );
  }
});

//Delete contacts based on the contact_id which is sent from the reac-app on click of x button
//http://localhost:4000/api/contacts/delete
router.delete("/contacts/delete", (req, res) => {
  const id = req.body.id;
  connection.query(
    `DELETE FROM contacts WHERE contact_id = ${id}`,
    (err, response) => {
      if (err) console.log(err);
      connection.query(
        "SELECT * FROM contacts ORDER BY contact_id DESC",
        (err, result) => {
          if (err) console.log(err);
          res.send(result);
        }
      );
    }
  );
});

//Update contact info based on contact_id
//http://localhost:4000/api/contacts/update
router.put("/contacts/update", (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const comment = req.body.comment;

  connection.query(
    "UPDATE contacts SET firstname = ?, lastname = ?, user_message = ? WHERE contact_id = ?",
    [firstName, lastName, comment, id],
    (err, response) => {
      if (err) console.log(err);
      connection.query("SELECT * FROM contacts", (err, result) => {
        res.send(result);
      });
    }
  );
});

module.exports = router; //Export the endpoints to be used in another file
