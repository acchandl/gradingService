const express = require('express');
const worksheet = require('../controllers/worksheet');
const router = express.Router();

router.get('/', worksheet.getAllWorksheets);
router.get('/:studentID', worksheet.getWorksheetsByStudentId);

router.post('/:studentID', worksheet.createWorksheet);

// get number of changes made
router.patch('/:worksheetID', worksheet.patchWorksheet);

module.exports = router;