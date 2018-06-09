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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

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
	var dir;

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
				//Pare specs.json
				var specifications = JSON.parse(data);
				if(specifications.hasOwnProperty('start')){
					//If start command exists
					if(specifications.start != 'none'){
						//Append to processes.txt
						fs.appendFileSync('src/processes.txt', ('../uploads/' + specifications.project + '/' + specifications.start + '\n'));
						//Add port number to portNext
						portNet.push(parseInt(portNet.length) + parseInt(port));
					}
					//Create new path and launch processes
					forge(newRouteName, specifications.start, portNet[portNet.length-1]);
					res.send('Request has been processed!');
				}
				else{
					res.send('Please make sure your specs.json has all the right data!');
				}
			}
		})
	});
});

process.on('SIGINT', function() {
  //fs.closeSync(fs.openSync('src/processes.txt', 'w'));
  fs.writeFileSync('src/processes.txt', '');
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
	exec.execFile('src/sauron', [routeName, startCommand, launchPort], (error, stdout, stderr) =>{
		if(error){
			throw error;
		}
		console.log(stdout);
	});
}

//Dynamically appended redirects