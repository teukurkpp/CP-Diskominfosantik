const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', programController.getPrograms);
router.get('/:id', programController.getProgramDetail);
router.post('/upload', authMiddleware, programController.createProgram);
router.put('/:id', authMiddleware, programController.updateProgram);
router.delete('/:id', authMiddleware, programController.deleteProgram);

module.exports = router;
