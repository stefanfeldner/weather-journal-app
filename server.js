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
const projectData = [];

app.post('/log', (req, res) => {
    console.log('EY'+req.body);
    projectData.push(req.body);
    console.log('Data:' + projectData)
});