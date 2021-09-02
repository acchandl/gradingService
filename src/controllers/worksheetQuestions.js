const db = require("../server.js");
const moment = require('moment');
// const gradingTool = require("../utils/gradingTool");

const grades = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
  INVALID: "invalid"
};
const units = {
  FAHRENHEIT: "F",
  CELSIUS: "C",
	KELVIN: "K",
	RANKIE: "R",
};

// dates to insert
const today = moment();

// request object contains headers, parameters and body
// response object sends content and headers
const getQuestions = (req, res) => {
  try{
    let query = 'SELECT * FROM worksheetQuestions';
    let params = [];
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('getQuestions error:', err.message);
          return;
      }
      // return json response with a success message and data
      res.json({
        "message":"success",
        "data":rows
      })
    });
  } catch(error) {
    res.status(400).json({error: error.message});
  }
}

// get the worksheet questions by worksheetID
const getQuestionsByID = (req, res) => {
  try {
    let query = 'SELECT * FROM worksheetQuestions WHERE id = ?';
    // express.js endpoint :id is mapped to variable in req.params.id
    let params = [req.params.worksheetID];
    db.get(query, params, (err, row)=> {
      if (err) {
        console.error('getQuestionsByID error:', err.message);
        return;
      }
      res.json({
        "message":"success",
        "data":row
      })
    });
  } catch (error) {
        res.status(400).json({error: error.message});   
  }
}

const createQuestions = (req, res) => {
    try {
        if (!req.body.worksheetId) {
          console.error('createQuestions error:', err.message);
            return;
        }

        if (!temperature || !temperatureType || !typeTarget || !response) {
          res.status(400).json({"error": 'temperature, temperatureType, typeTarget, and response are required'});
            return;
        }

        let query = 'INSERT INTO worksheetQuestions (worksheetID, temperature, temperatureType, typeTarget, response, grade) VALUES (?,?,?,?,?,?)';
        let params = [req.body.worksheetID,
                      req.body.temperature,
                      req.body.temperatureType,
                      req.body.typeTarget,
                      req.body.response,
                      req.body.grade];
        db.run(query, params, function(err, result){
            if (err){
              console.error('createQuestions error:', err.message);
              return;
            }
            // if everything is ok return json response with a new id (this.lastID),
            // automatically created for the user
            res.json({
                'message': 'success',
                'id' : this.lastID
            })
        });  
    } catch (error) {
        res.status(400).json({error: error.message});      
    }
};

exports.getQuestions = getQuestions;
exports.getQuestionsByID = getQuestionsByID;
exports.createQuestions = createQuestions;