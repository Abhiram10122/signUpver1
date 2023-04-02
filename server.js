const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path")

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

    const options = {
        method: "POST",
        auth: "abihram:0801912c6b477ebd935061ef2804a60f-us21"
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



// e29b65618c4380ae4023e1a7db90ccae-us21

//List ID
// 3b7d3e4ef6
