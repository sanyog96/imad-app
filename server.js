var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'sanyog96',
    database: 'sanyog96',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: 'Article One : Sanyog Sharma',
        heading: 'Articel One',
        date: 'August 15,2017',
        content: `  <p>
                        This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.
                    </p>
                    <p>
                        This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.This is the content of my first aricle.
                    </p>`
},
    'article-two': {
        title: 'Article Two : Sanyog Sharma',
        heading: 'Article Two',
        date: 'August 15,2017',
        content: ` <p>
                        This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.
                    </p>
                    <p>
                        This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.This is the content of my Second aricle.
                    </p> `
},
    'article-three': {
        title: 'Article Three : Sanyog Sharma',
        heading: 'Article Three',
        date: 'August 15,2017',
        content: ` <p>
                        This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.
                    </p>
                    <p>
                        This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.This is the content of my third aricle.
                    </p>`
}
};

function createTemplate (data){
    var title= data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    //How do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'This is some random string');
    res.send(hashedString);
});

app.get('/test-db', function(req, res) {
   //make a select request
   //respnse with the result
   pool.query('Select * from test', function(err, result) {
     if(err) {
     res.status(500).send(err.toString());
     } else {
         res.send(JSON.stringify(result));
     }
   });
});

var counter= 0;
app.get('/counter', function (req, res) {
  counter = counter +1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) { ///submit-name?name=.......
  //set the name from the request
  var name = req.query.name;
  
  names.push(name);
  //JSON : Javascript Object Notation
  res.send(JSON.stringify(names));
});

app.get('/:articleName', function(req, res) {
    // articleName == article-one
    // articles[articleName] == {} content object for article one
    var articleName= req.params.articleName; 
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
