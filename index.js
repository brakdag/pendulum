const express = require("express")
const app = express();
const PORT = 3000;
app.use('/', express.static(__dirname + '/public'));
console.log(`listen in port ${PORT}`)
app.listen(PORT);