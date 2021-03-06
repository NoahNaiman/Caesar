//Setup process title
process.title = "Sauron"

//Dependecy imports
const exec = require('child_process');
const express = require('express');
const app = express();
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

//View engine setup
app.set('view engine', 'pug');

/*UNCOMMENT IF CSS IS ADDED!*/
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

//Setup port and port nets
const port = process.env.PORT || 3000;
var portNet = [port];

//Startup server
app.listen(port, () => 
	console.log(`\nThe eye of Sauron watches port ${port}!\n`)
);

//Landing page
app.get('/', (req, res) =>
	res.render('index')
);

//Veni, vidi, vici
app.post('/landofmordor', (req, res) =>{
	//Parse incoming form data
	var form = new formidable.IncomingForm();
	form.parse(req);

	//Create project directory
	form.on('field', function(name, field){
		if(name == 'project'){
			//Sets global variables for later use
			newRouteName = field;
			dir = path.join('uploads', field);

			//Check synchronously if project directory exists already.
			if(fs.existsSync(dir)){
				deleteFolder(dir);
			}

			//Asynchronously create new project directory
			fs.mkdir(dir, ()=>{
				return null;
			});
		}
		else if(name == 'start'){
			//Set starter for later use
			starter = field;
		}
	});

	//Save files to project directory
	form.on('fileBegin', function(name, file){
		file.path = path.join(dir, file.name);
		console.log(file.name + ' saved.');
	});

	//Create express route for project, then redirects
	form.on('end', () =>{
		if(starter != 'none' && starter != 'undefined'){
			//Append to processes.txt
			fs.appendFileSync('processes.txt', (starter) + '\n');
			//Add port number to portNext
			portNet.push(parseInt(portNet.length) + parseInt(port));
		}

		//Create new path and launch processes
		forge(newRouteName, starter, portNet[portNet.length-1]);
		setTimeout(()=>{
			res.render('list');
		}, 5);
	});
});

//Safely exit
process.on('SIGINT', ()=>{
	//Clean up files
	exec.execFileSync('src/gollum.sh');
	//Exit process
	process.exit(0);
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

//Create express routes and/or launches project for project
function forge(routeName, startCommand, launchPort){
	exec.execFile('bin/sauron', [routeName, startCommand, launchPort], (error, stdout) =>{
		if(error){
			throw error;
		}
		console.log(stdout);
	});
}

//Dynamically appended redirects
