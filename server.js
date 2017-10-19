const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000; // For both heroku and local


var app = express();

//Add support for partials
hbs.registerPartials(__dirname + '/views/partials');// absolute path is required 
//We can also create helpers to our partials
hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear()
})
//We can also pass arguments to our helpoer function, below is a helper to make 
//all the text upper case

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})

app.set('view engine', 'hbs');

//Http route handling

//When somebody visit the root of our server we need to address the request
//by sending JSON data or html page etc.. we do that using app.get 

app.use(express.static(__dirname + "/public"));//middleware to help load static directories

//middleware for server logs
app.use((req, res, next) =>{
	var  now  = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + "\n", (err)=>{
		if(err){
			console.log("Unable to append to the file");
		}
	});
	next();
});

//middleware for maintenance page
// app.use((req, res, next) =>{
// 	res.render('maintenance.hbs');
// });

app.get("/", (req, res) =>{ // contains two arguments requests and response
	//send HTML
	//res.send('<h1>Hello Express!<h1>');
	//send JSON
	res.render('home.hbs',{
		welcomeMessage:' Hey Anshik Welcome to Express Home Page',
		pageTitle: 'Home Page',
	});
});

app.get('/about',(req,res) =>{
	//res.send("About Page");
	res.render('about.hbs',{
		welcomeMessage:' Hey Anshik Welcome to Express About Page',
		pageTitle: 'About Page',
	});
});

app.get('/project',(req,res) =>{
	//res.send("About Page");
	res.render('project.hbs',{
		welcomeMessage:' Hey Anshik Welcome to Express Project Page',
		pageTitle: 'Projects Page',
		text: 'Here you will find all of Express project',
	});
});

// app.get('/bad',(req,res) =>{

// 	res.send({
// 		'errorMessage':'Unable to fulfill the request'
// 	})
	
// });


app.listen(port, ()=>{
	console.log(`Server is up and running on port ${port}`);
}); // app listens to http request through this server on localhost

