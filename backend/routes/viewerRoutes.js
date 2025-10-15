// routes/viewerRoutes.js
const express = require('express');
const router = express.Router();
const viewerController = require('../controllers/viewerController');

router.get('/', viewerController.getViewerLogs);
router.post('/', viewerController.createViewerLog);

module.exports = router;
