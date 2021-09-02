// import modules and create express app
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3128;
const routes = require('./routes/routes');
const moment = require('moment');

const app = express();

// dates to insert
const today = moment();
const tomorrow = moment().add(1,'days');
const yesterday = moment().add(-1, 'days');

app.use(express.urlencoded({extended: false})); // use URL-encided data with querystring library
// allowing for JSON-like experience with URL-encoded
app.use(express.json()); // parses json when Content-Type header matches type option
// a new body object containing the parsed data is populated on the request object
// app.use(cors());


// Root endpoint
app.get('/', function(req, res) {
    res.send('Testing Server!');
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

app.use("/students/", routes.student);

app.use("/worksheet/", routes.worksheet);

app.use("/worksheetQuestions/", routes.worksheetQuestions);

app.listen(PORT, function() {
    console.log(`App is running on localhost:${PORT}.`);
});

let db = new sqlite3.Database('database/gradingApp.db', (err) => {
  try {
    console.log('Connected to the database.');

    db.run(`CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        created TIMESTAMP DEFAULT TIMESTAMP,
        updated TIMESTAMP DEFAULT TIMESTAMP
        )`,
    (err) => {
        if (err) {
          // Table already created
        } else {
            // Table just created, creating some rows
            let insert = 'INSERT INTO student (name, created) VALUES (?,?)'
            db.run(insert, ['lisa',today])
            db.run(insert, ['bart',tomorrow])
            db.run(insert, ['maggie',yesterday])
        }
    });
    
    db.run(`CREATE TABLE worksheet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created TIMESTAMP DEFAULT TIMESTAMP,
        updated TIMESTAMP DEFAULT TIMESTAMP,
        studentID INTEGER
        )`,
    (err) => {
        if(err){
          // Table already created
        } else {
            // Table just created, creating some rows
            let insert = 'INSERT INTO worksheet (studentID, created) VALUES (?,?)';
            db.run(insert, today);
            db.run(insert, tomorrow);
            db.run(insert, yesterday);
        }
    });

    db.run(`CREATE TABLE worksheetQuestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature INTEGER,
        temperatureType TEXT,
        typeTarget,
        response,
        grade,
        worksheetID INTEGER
        )`,
    (err) => {
        if(err){
          // Table already created
        } else {
            // Table just created, creating some rows
            let insert = 'INSERT INTO worksheet (temperature, temperatureType, typeTarget, response, grade, worksheetID) VALUES (?,?,?,?,?,?)';
            db.run(insert, [84.2, 'Fahrenheit', 'Rankine', 543.50, 'correct', 1]);
            db.run(insert, [-45.14, 'Celsius', 'Kelvin', 227.51, 'correct', 2]);
            db.run(insert, [317.33, 'Kelvin', 'Fahrenheit', 110.50, 'incorrect', 3]);
        }
    });

    } catch (err) {
        return console.error(err.message);
    }
});

/* close db when i'm done with it
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
*/

module.exports = db;
