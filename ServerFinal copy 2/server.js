//import {engine} from 'express-handlebars'
//import * as d3 from "d3"
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const locations = [2, 11, 9, 9, 9]
const parser = require("body-parser")
app.use(parser.json())

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
    response.sendFile(path.join(__dirname, "yellow.html"));
    //response.redirect("yellow.html")
})

app.get("/questions", (request, response )=>{
    JSON.stringify(response.sendFile(path.join(__dirname, "questions.txt")));
})

app.get("/answers", (request, response )=>{
    JSON.stringify(response.sendFile(path.join(__dirname, "answers.txt")));
})

app.post(`/check`, function(req,res){
    const packet = {
        submittedAnswerCorrect: null,
        correctAnswers: null
    }
    let value = req.body.value;
    let answer = req.body.answer;
    console.log(value, answer)
    let correct = []
    for(let i = 0; i < answer.length; i++){
        correct.push(answer[i][0])
    }
    console.log(correct, value)
    let toReturn = {}

    for(let j = 0; j < answer.length; j++){
        console.log(correct[j], value[j])
        if(correct[j] == value[j]){
            toReturn[j] = true;
        }else{
            toReturn[j] = false;
        }
    }
    packet.submittedAnswerCorrect = toReturn;
    packet.correctAnswers = correct;
    res.send(JSON.stringify(packet))
    /*
    let game = games[gameid];
    let row = req.body.row
    let col = req.body.col
    let triggerFlag = req.body.flag*/
})

app.use((request, response)=>{
    response.type('text/plain')
    response.status(404)
    response.send("404 not found")
})


app.listen(port,()=> console.log(`Server is online and on Port: ${port}`))