//Dependecy imports
const express = require('express');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

//View engine setup
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//Server listening
app.listen(8080, () => 
	console.log('Santa Claus is coming to port 8080!')
);

//Landing
app.get('/', (req, res) =>
	res.render('index')
);

//Dear Santa
app.post('/dearsanta', (req, res) =>{
	var form = new formidable.IncomingForm();
	form.parse(req)
	.on('field', function(name, field){
		if(name == "project"){
			var dir = path.join(__dirname, 'uploads', field);
			if(!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
			else{
				console.log("Folder exists");
			}
		}
	})
	.on('file', function(name, file){
		console.log('Got file:', file);
	})
	.on('end', function(){
		res.send('YOYOYOYOYO');
	});
});
