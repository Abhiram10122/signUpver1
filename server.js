const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path")
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "public/index.html"));
})

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/3b7d3e4ef6";
    const apikey = process.env.API_KEY

    const options = {
        method: "POST",
        auth: "abihram:"+apikey

    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/public/succuss.html");
        }
        else{
            res.sendFile(__dirname + "/public/failed.html");
        }
    })

    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, function(){
    console.log("This is running");
})



// df4c67105ef436ed900ba7b20f0f5c5f-us21

//List ID
// 3b7d3e4ef6
