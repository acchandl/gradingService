const db = require('../server.js');
const moment = require('moment');

// dates to insert
const today = moment();

// request object contains headers, parameters and body
// response object sends content and headers
const getAllWorksheets = (req, res) => {
  try{
    let query = 'SELECT * FROM worksheet';
    let params = [];
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('getAllWorksheets error:', err.message);
          return;
      }
      // return json response with a success message and data
      res.json({
        'message':'success',
        'data':rows
      })
    });
  } catch(error) {
    // bad request code
    res.status(400).json({error: error.message});
  }
}

const getWorksheetsByStudentId = (req, res) => {
  try {
    let query = 'SELECT * FROM worksheet WHERE studentID = ?';
    // express.js endpoint :id is mapped to variable in req.params.id
    let params = [req.params.studentID];
    db.get(query, params, (err, row)=> {
      if (err) {
        console.error('getWorksheetsByStudentId error:', err.message);
        return;
      }
      res.json({
        'message':'success',
        'data':row
      })
    });
  } catch (error) {
        res.status(400).json({error: error.message});   
  }
}

const createWorksheet = (req, res) => {
    try {
        if (!req.body.studentID) {
          console.error('createWorksheet error:', err.message);
            return;
        }
        let query = 'INSERT INTO worksheet (studentID, created) VALUES (?,?)';
        let params = [req.params.studentID, today];
        db.run(query, params, function(err, result){
            if (err){
              console.error('createStudent error:', err.message);
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

const patchWorksheet = (req, res) => {
    try {
        const id = req.params.worksheetID;
        const updated = today;
        const studentID = req.body.studentID;

        if (!req.body.name) {
          console.error('patchWorksheet error:', err.message);
          return;
        }
        // use coalesce to keep the current value if there is no new value (null)
        let query = `UPDATE worksheet set
        updated = COALESCE(?, updated),
        studentID = COALESCE(?,studentID)
        WHERE id = ?`;
        let params = [id, updated, studentID];
        db.run(query, params, function(err, result){
            if (err){
              console.error('patchStudent error:', err.message);
                return;
            }
            res.json({
                message: 'success',
                changes: this.changes, // the number of rows updated
            });
        });
          
    } catch (error) {
        res.status(400).json({error: error.message});      
    }
};

exports.getAllWorksheets = getAllWorksheets;
exports.getWorksheetsByStudentId = getWorksheetsByStudentId;
exports.createWorksheet = createWorksheet;
exports.patchWorksheet = patchWorksheet;