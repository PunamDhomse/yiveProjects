// FileName: index.js

// Import express - Node js library- it is used to connect with backend(connect with everything)

let express = require('express');

// Import Body parser - when we are making post request to pass the request data in body
let bodyParser = require('body-parser');
var path = require('path');
// Import Mongoose -  is connecting with Mongodb
let mongoose = require('mongoose');
let cors = require('cors');
let jwt = require('./helpers/jwt');
let errorHandler = require('./helpers/errorHandler');
// Initialize the app
let app = express();

// Import routes file
let apiRoutes = require("./routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);
// Connect to Mongoose and set connection variable
// tables = collections
// rows = documents
mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb://yivedbuser:yive321!@dbh23.mlab.com:27237/yive', { useUnifiedTopology: true, useNewUrlParser: true});
mongoose.connect('mongodb://localhost/yivedb', { useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// Setup server port
var port = process.env.PORT || 3001;

// Send message for default URL
// req - whatever we send in the request through API call
// res - we get respose on the basis of what we sent to through req API

app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});