var express = require("express")
var app = express();

app.use('/', express.static(__dirname + '/public'));
//app.use('assets', express.static(__dirname + '/public/assets'));

app.listen(3000);