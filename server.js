//Dependecy imports
const exec = require('child_process');
const express = require('express');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

//Environment setup
const port = process.env.port || 3000;

//View engine setup
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//Startup server
app.listen(port, () => 
	console.log('\nCaesar has conquered port ' + port + '!\n')
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
	var dir;

	//Create project directory
	form.on('field', function(name, field){
		if(name == 'project'){
			//Sets global variables for later use
			newRouteName = field;
			dir = path.join(__dirname, 'uploads', field);

			//Check synchronously if project directory exists already.
			if(fs.existsSync(dir)){
				deleteFolder(dir);
			}

			//Asynchronously create new project directory
			fs.mkdir(dir, ()=>{
				return null;
			});
		}
	});

	//Save files to project directory
	form.on('fileBegin', function(name, file){
		file.path = path.join(dir, file.name);
		console.log(file.name + ' saved.');
	});

	//Create express route for project, then redirects
	form.on('end', () =>{
		fs.readFile(path.join(dir, 'specs.json'), (error, data)=>{
			if(error){
				//Error with specs.json file
				res.send('Sorry, please double check that your specs.json file is in the right place.');
			}
			else{
				//Create new route
				var specifications = JSON.parse(data);
				if(specifications.hasOwnProperty('start')){
					fs.readFile(path.join(dir, ''))
					makeRoute(newRouteName, specifications.start);
					res.send('Request has been processed!');
				}
				else{
					res.send('Please make sure your specs.json has all the right data!');
				}
			}
		})
	});
});

//Recursively delete a folder and its contents
function deleteFolder(dir){
	if(fs.existsSync(path)){
		fs.readdirSync(dir).forEach(function(file,index){
			var curPath = dir + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()){
				deleteFolder(curPath);
			}
			else{
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dir);
	}
};

//Create express route for project
function makeRoute(routeName, startCommand){
	exec.execFile('./caesar', [routeName, startCommand], (error, stdout, stderr) =>{
		if(error){
			throw error;
		}
		console.log(stdout);
	});
}

//Dynamically appended static webpages