const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', beritaController.getBerita);
router.get('/terbaru', beritaController.getBeritaTerbaru);
router.get('/:id',beritaController.getBeritaDetail);
router.post('/upload', authMiddleware, beritaController.uploadBerita);
router.delete('/:id', authMiddleware, beritaController.deleteBerita);
router.put('/:id', authMiddleware, beritaController.updateBerita);


module.exports = router;
