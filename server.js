const express = require("express"); //Import express
const path = require("path"); //Import path from node
const helmet = require("helmet"); //Import helmet
const morgan = require("morgan"); //Import morgan
require("dotenv").config(); //Import dotenv.config

const app = express(); //Save the object returned from express()
const port = process.env.PORT || 400; //Set the port variable to be equal to system defined port or 3001
const apiRoutes = require("./routes/apiRoutes");

//Prevent default powered by header for node from appearing so that hackers can't easily know what security defects to exploit
app.use(helmet.hidePoweredBy());
//Prevent site from being used for a frame which can be used to make users they are using a site they are not. Deny allows no one to use the site as a frame. sameorgin or allow-from can set different permissions.
app.use(helmet.frameguard({ action: "deny" }));
//Sets "X-XSS-Protection: 1; mode=block" helps prevent reflective xss attacks. Which means adding script tags into the url of a page. It is not used for older versions of internet explorer because it can cause worse security issues
app.use(helmet.xssFilter());
//Sets "X-Content-Type-Options: nosniff". This prevents a file that says it has one content type from having different content that the browser may sense and use instead.
app.use(helmet.noSniff());
// Sets "X-Download-Options: noopen". This prevents someone from adding a malicious HTML file to the site that could be downloaded by older versions of internet explorer and run.
app.use(helmet.ieNoOpen());
//Used for put and post requests where server must accept the data
app.use(express.json()); //recognizes that an incoming request object is a JSON object
app.use(express.urlencoded({ extended: true })); //Recognizes that an incoming request object is a string or an array
//Logs information about server requests. The 'dev' format color codes the status codes as well for clear reading during development
app.use(morgan("dev"));

//Check if the project is in production or development. If it is production then it will run the static build file.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use apiRoutes
app.use("/api", apiRoutes);

//On the root route send the user to the index.html page
//http://localhost:3000/
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//If another url path is entered return a 404 status
app.get("*", (req, res) => {
  res.status(404).send("404 Page not found!");
});

//Have the server listen for requests on the specified port above and print that it is listening on port#
app.listen(port, console.log(`Server listening on port: ${port}`));