require('dotenv').config();
var bodyParser = require('body-parser')
var express = require('express');

var app = express(
   
   );
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   
   app.use( (req, res, next)=>{
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
    })
   app.get("/json", function(req, res) {
    let message = 'Hello json'
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      return res.status(200).json({"message": message.toUpperCase()})
    }
    return res.status(200).json({"message": message})
  });
  const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
  };

  app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });

  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
  });

  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });
  
  app.get("/now", middleware, (req, res) => {
    res.send({
      time: req.time
    });
  });






























 module.exports = app;
