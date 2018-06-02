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

//Startup server
app.listen(8080, () => 
	console.log('\nCaesar has conquered port 8080!\n')
);

//Landing page
app.get('/', (req, res) =>
	res.render('index')
);

//Veni, vidi, vici
app.post('/venividivici', (req, res) =>{
	//Parse incoming form data
	var form = new formidable.IncomingForm();
	form.parse(req);
	//Create new routes
	form.on('field', function(name, field){
		if(name == 'project'){
			//Check if project folder already exists
			var dir = path.join(__dirname, 'uploads', field);
			if(fs.existsSync(dir)){
				console.log("FOLDER EXISTS!!!!");
				deleteFolder(dir);
			}
			fs.mkdir(dir, ()=>{return null;});
			//Save files to project folder
			form.on('fileBegin', function(name, file){
				file.path = path.join(dir, file.name);
			});
			//Create express route for project
			exec.execFile('./caesar', [field], (error, stdout, stderr) => {
				if(error){
					throw error;
				}
				console.log(stdout);
			});
		}
	});
	//Redirect on process finishing
	res.send('Request has been processed!')
});

function deleteFolder(dir){
	if(fs.existsSync(path)){
		fs.readdirSync(dir).forEach(function(file,index){
			var curPath = dir + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()){
				deleteFolder(curPath);
			}
			else{ // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dir);
	}
};