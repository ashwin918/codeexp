const express = require('express');
const router = express.Router();
const adminLogController = require('../controllers/adminLogController');

router.get('/', adminLogController.getAllLogs);
router.post('/', adminLogController.createLog);
router.delete('/:id', adminLogController.deleteLog);

module.exports = router;
