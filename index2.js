var express = require('express');
const path = require("path");
var app = express();
const port = "8000";
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var http = require('http');
var fs = require('fs');
var mysql = require('mysql');



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/"));

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, function (err) {
    if (err) { console.log('Error in running', err); }
    console.log('Yup! My express server is running on port', port);
});

//app.use(express.static("storeImages"));
//home route
app.get('/home', (req,res) => {
    return res.render('home');
})
//our work route
app.get('/our-work', (req,res) => {
    return res.render('our_work');
})
//contact us form route
app.get('/form', (req, res) => {
    return res.render('form');

});

//about us route
app.get('/about-us', (_req, res)=> {
    return res.render('about_us');
});
//store route
app.get('/store', (req,res) => {
    return res.render('store');
})


//mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'interior_design'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connect...');
});




app.post('/create-new', urlencodedParser, function (req, res) {
    console.log(req.body);
    
    var sql = "insert into test values(null,'" + req.body.name + "','" + req.body.email + "', " + req.body.telnum + ",'" + req.body.address + "','" + req.body.city + "','" + req.body.state + "')"


    connection.query(sql, function (err) {
        if (err) throw err;

        var user_name = "";
        var user_address = "";
        var user_state = "";
        var user_email = "";
        var user_telnum = "";
        var user_city = "";
        res.render('Resultpage.ejs', {
            user_name: req.body.name,
            user_address: req.body.address,
            user_state: req.body.state,
            user_email: req.body.email,
            user_telnum: req.body.telnum,
            user_city: req.body.city
        });
    });
    connection.end();
});

























/*var express = require('express');
const path = require("path");
var app = express();
const port = "8000";
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var http = require('http');
var fs = require('fs');



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/"));


app.listen(port, function (err) {
    if (err) { console.log('Error in running', err); }
    console.log('Yup! My express server is running on port', port);
});

app.use(express.static("storeImages"));

app.get('/', function (req, res) {
    return res.render('form');

});








app.post('/create-new', urlencodedParser, function (req, res) {

    var user_name = "";
    var user_address = "";
    var user_state = "";
    var user_email ="";
    var user_telnum = "";
    var user_city = "";
    res.render('Resultpage', {
         user_name : req.body.name,
         user_address : req.body.address,
         user_state : req.body.state,
         user_email : req.body.email,
         user_telnum : req.body.telnum,
         user_city : req.body.city
    });
});

*/











