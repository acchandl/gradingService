const db = require('../server.js');
const moment = require('moment');

// dates to insert
const today = moment();

// request object contains headers, parameters and body
// response object sends content and headers
const getStudent = (req, res) => {
  try{
    let query = 'SELECT * FROM student';
    let params = [];
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('getStudent error:', err.message);
          return;
      }
      // return json response with a success message and data
      res.json({
        'message':'success',
        'data':rows
      })
    });
  } catch(error) {
    res.status(400).json({error: error.message});
  }
}

const getStudentByID = (req, res) => {
  try {
    let query = 'SELECT * FROM student WHERE id = ?';
    // express.js endpoint :id is mapped to variable in req.params.id
    let params = [req.params.id];
    db.get(query, params, (err, row)=> {
      if (err) {
        console.error('getStudentByID error:', err.message);
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

const createStudent = (req, res) => {
    try {
        if (!req.body.name) {
          console.error('getStudentByID error:', err.message);
            return;
        }
        let data = {
          name: req.body.name
      }
        let query = 'INSERT INTO student (name, created ) VALUES (?,?)';
        let params = [req.body.name, today];
        db.run(query, params, function(err, result){
            if (err){
              console.error('createStudent error:', err.message);
              return;
            }
            // if everything is ok return json response with a new id (this.lastID),
            // automatically created for the user
            res.json({
                'message': 'success',
                'data': data,
                'id' : this.lastID
            })
        });  
    } catch (error) {
        res.status(400).json({error: error.message});      
    }
};

const patchStudent = (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const updated = today;

        if (!req.body.name) {
            res.status(400).json({'error': 'A name for the student must be provided'});
            return;
        }
        let data = {
          name: req.body.name
        }
        // use coalesce to keep the current value if there is no new value (null)
        let query = `UPDATE student set
        name = COALESCE(?,name),
        updated = COALESCE(?, updated)
        WHERE id = ?`;
        let params = [id, name, updated];
        db.run(query, params, function(err, result){
            if (err){
              console.error('patchStudent error:', err.message);
                return;
            }
            res.json({
                message: 'success',
                'data': data,
                changes: this.changes, // the number of rows updated
            });
        });
          
    } catch (error) {
        res.status(400).json({error: error.message});      
    }
};

exports.getStudent = getStudent;
exports.getStudentByID = getStudentByID;
exports.createStudent = createStudent;
exports.patchStudent = patchStudent;