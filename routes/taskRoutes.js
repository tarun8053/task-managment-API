const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads');
const taskController = require('../controllers/taskContoller');

router.post('/task', upload.single('attachment'), taskController.createTask);

module.exports = router;