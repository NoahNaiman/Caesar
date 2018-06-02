//Dependecy imports
const exec = require('child_process');
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
	console.log('Caesar has conquered port 8080!')
);

//Landing
app.get('/', (req, res) =>
	res.render('index')
);

//Veni, vidi, vici
app.post('/venividivici', (req, res) =>{
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('field', function(name, field){
		if(name == 'project'){
			var dir = path.join(__dirname, 'uploads', field);
			if(!fs.existsSync(dir)){
				fs.mkdirSync(dir);
			}
			else{
				console.log('Folder exists');
				res.send('Folder already exists!!!');
				process.exit(1);
			}
			form.on('fileBegin', function(name, file){
				file.path = path.join(dir, file.name);
			});
		}
	});
	exec.execFile('./caesar', ["//THIS INPUT HAS BEEN TEST APPENDED"], (error, stdout, stderr) => {
		if(error){
			throw error;
		}
		console.log(stdout);
	});
	res.send('Request has been processed!');
});