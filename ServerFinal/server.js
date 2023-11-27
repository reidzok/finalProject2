//import {engine} from 'express-handlebars'
//import * as d3 from "d3"
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const locations = [2, 11]

app.get("/", (request, response) =>{
    //initialization page
    response.sendFile(path.join(__dirname, "temp.html"))

})

for(let i = 0; i < locations.length; i++){
    for(let g = 0; g<locations[i];g++){
        app.get("/assets/"+i+"/"+g+".png", (request, response) =>{
            response.sendFile(path.join(__dirname, "/assets/"+i+"/"+g+".png"))
        })
    }
}

app.get("/form", (request, response )=>{
    console.log("mhm")
    response.sendFile(path.join(__dirname, "yellow.html"))
})

app.use((request, response)=>{
    response.type('text/plain')
    response.status(404)
    response.send("404 not found")
})

app.listen(port,()=> console.log(`Server is online and on Port: ${port}`))