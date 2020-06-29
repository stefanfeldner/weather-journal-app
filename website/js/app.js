// Personal API Key for OpenWeatherMap API
const apiKey = 'bc178569d2139818f76a0f9a00b4b3de';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = + d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', getDataFromInput);

/* Function called by event listener */

apiURL = '';
dataToPost = {};
let dataTemp = '';

async function getDataFromInput() {
    // get the user input
    const zipCode = document.getElementById('zip').value;
    const countryCode = document.getElementById('country').value;
    const feelingsEntry = document.getElementById('feelings').value;
   
    // create the url to fetch from
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`;
    console.log(zipCode, countryCode, feelingsEntry, newDate);
    // console.log(apiURL);
    await weatherData(apiURL);

    dataToPost.date = newDate;
    dataToPost.temp = dataTemp;
    dataToPost.feelings = feelingsEntry; 

    console.log(dataToPost);

    updateUI(newDate, dataTemp, feelingsEntry);
}

/* Function to GET Web API Data*/
const weatherData = async (url) => {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        dataTemp = data.main.temp;
    })
    .catch(error => console.log(err));
};

/* Change the UI and show the Most Recent Entry */

const updateUI = (dateTxt, tempTxt, contentTxt) => {
    const dateUI = document.getElementById('date').textContent = dateTxt;
    const tempUI = document.getElementById('temp').textContent = tempTxt + ' °C';
    const contentUI = document.getElementById('content').textContent = contentTxt;
};

/* Function to POST data */
const postData = async (url="", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error: ", error);
    }
};

postData('/log', {test: 'test', name: 'John'});
postData('/log', {age: 12, place: 'LA'});