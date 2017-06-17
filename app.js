var express = require('express');
var path    = require("path");
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public'));
});
app.use('/*',function (req,res){
  var str = req.params;
  str = str[0].toString();
  var naturaltounix;
  var unixtonatural;
  if(str.match(/^[0-9]+$/) != null){
    unixtonatural = new Date(parseInt(str)*1000);
    naturaltounix = str;
  }
  else {
    naturaltounix = Math.floor(new Date(str)/1000);
    unixtonatural = new Date(str);
  }
  var month = unixtonatural.getMonth()+1;
  var day = unixtonatural.getDate();
  var year = unixtonatural.getFullYear();
  switch(month){
    case 1: month = "January"; break;
    case 2: month = "February"; break;
    case 3: month = "March"; break;
    case 4: month = "April"; break;
    case 5: month = "May"; break;
    case 6: month = "June"; break;
    case 7: month = "July"; break;
    case 8: month = "August"; break;
    case 9: month = "September"; break;
    case 10: month = "October"; break;
    case 11: month = "November"; break;
    case 12: month = "December"; break;
    default : break;
  }
  if(isNaN(unixtonatural)) unixtonatural = null;
  else
    unixtonatural = month+" "+day+", "+year;
  var json = {"unix":naturaltounix,"natural":unixtonatural};
  res.end(JSON.stringify(json));
});
app.listen(8080);
