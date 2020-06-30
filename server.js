// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
// connects the server-side code to our client-side code
app.use(express.static('website'));

//setting the local server port
const port = 8000;

// first arg. is the port and the second is a callback function
const server = app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

// storing the weather data and using post so store it
let projectData = {};

app.post('/addData', (req, res) => {
    // saving the data in the global variable
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
    };
    console.log(projectData);

    res.status(200).send({
        success: true,
        message: "Data saved successfully",
        data: projectData
    });
});

app.get('/getData', (req, res) => {
    // sending projectData
    res.status(200).send(projectData);
    console.log('Send data');
});