//Dependecy imports
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
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
	var dir = path.join(_dirname, 'uploads', req.project);
	if(!fs.existsSynch(dir)){
		fs.mkdirSynch(dir)
	}
	else{

	}
});
