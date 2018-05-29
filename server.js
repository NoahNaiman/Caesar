//Library imports

//Set up express
const express = require('express');
const app = express();
app.set('view engine', 'pug');

//For static content
app.use(express.static(__dirname + '/static/'));

//Server listening
app.listen(8080, function(){
	console.log("Santa Claus is coming to port 8080!");
});

