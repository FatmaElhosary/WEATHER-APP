/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=b22204427e781e2f5030cab8df8c67ce';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Adds an event listener to an existing HTML button 
const generate=document.getElementById("generate");
generate.addEventListener('click',performAction);



//call back function 
function performAction(params) {  
    const zipCode=+document.getElementById('zip').value ;
    //if(zipCode)
    getWeather(baseURL,zipCode,apiKey).then((data)=>{
        console.log(data.name);
        const feeling=document.getElementById("feelings").value;
    postData('/addData',{temperature:data.name,d,feeling})
    })
  updateView()
   
}
//get request using fetch
const getWeather = async (baseURL, zipCode, key)=>{

    const req = await fetch(baseURL+zipCode+key);
    try {
      const data = await req.json();
      console.log(data)
       return data;
    }  catch(error) {
      console.log("error", error);

      // appropriately handle the error
    }
  }

////////////////////////////////////////
 const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  } 

//postData('/add', {answer:42});
 
const updateView=async ()=>{

    const request= await fetch('/all');

    try{
        const allData = await request.json();
        console.log("allllll "+ allData);
        document.getElementById('date').innerHTML = allData.d;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.feeling;
    
      }catch(error){
        console.log("error", error);
      }
}

