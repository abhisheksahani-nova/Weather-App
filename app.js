const express =  require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended : true}));



app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

})



app.post("/", function(req, res){



  const query =  req.body.cityName;
  const appKey = "d9b00f61e5449f159a9901dbbb98e395";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey +"&units="+unit;


  https.get(url, function(response){


    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const iconCode = weatherData.weather[0].icon;
      const weatherDescription =weatherData.weather[0].description ;
      const iconUrl = "http://openweathermap.org/img/wn/"+ iconCode +"@2x.png" ;

      console.log(iconCode);


      res.write("<p>The weather is currently " + weatherDescription + "<p>" );
      res.write("<h1>The temperature in "+ query +" is "+ temp +"degree celsius </h1>");
      res.write("<img src=" + iconUrl +">");
      res.send();

    });

  });

});


app.listen(3000, function(){
  console.log("Server is Up");

});
