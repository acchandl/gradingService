const express = require('express');
const student = require('../controllers/student');
const router = express.Router();

router.get('/', student.getStudent);
router.get('/:id', student.getStudentByID);

router.post('/', student.createStudent);

// use patch for update operations
// get number of changes made
router.patch('/:id', student.patchStudent);

module.exports = router;