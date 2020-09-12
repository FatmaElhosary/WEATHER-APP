// Setup empty JS object to act as endpoint for all routes
projectData ={};

// Require Express to run server and routes
const express = require('express');
const bodyParser=require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/



//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
//Routes//////
//
app.get('/all',(req,res)=>res.json(projectData));


 // POST new data
app.post('/addData', addData);

function addData (req,res){
    if(req.body&&req.body!=''&&req.body!=undefined){
        projectData=req.body;
        // console.log(projectData);
     
         res.json(projectData);
    }else{
        console.log("error in data ");
    }
 
};
 

// Setup Server
const port = 3000;
const server=app.listen(port,()=>{
    console.log(`running on localhost: ${port}`);
});