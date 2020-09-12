/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=b22204427e781e2f5030cab8df8c67ce&units=imperial";
//&units=metric

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();
//add 1 to date
//Adds an event listener to an existing HTML button
const generate = document.getElementById("generate");
generate.addEventListener("click", performAction);

//call back function
function performAction(params) {
  const zipCode = +document.getElementById("zip").value;
  if(zipCode&&zipCode!=undefined&&zipCode!==""){
  getWeather(baseURL, zipCode, apiKey)
    .then(async(data) => {
      console.log(data.name);
      const feeling = document.getElementById("feelings").value;
     await postData("/addData", { temperature: data.main.temp, date, feeling });
    })
    .then(() => {
      updateView();
    });
  }else{
alert("please ,Enter Zip Code ..")
  }
}
//get request using fetch
const getWeather = async (baseURL, zipCode, key) => {
  //fetch data from api
  const req = await fetch(baseURL + zipCode + key);
  try {
    //convert data to json
    const data = await req.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);

    // appropriately handle the error
  }
};

////////////////////////////////////////
//
const postData = async (url = "", data = {}) => {
  //code to fetch route  url and write req method, creadentials
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//postData('/add', {answer:42});

 const updateView = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();
    ///////////why not appear in console???!/////////////
   
    /////update UI////////
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.feeling;
    console.log("allllll " + allData);
  } catch (error) {
    console.log("error", error);
  }
}; 
 