const express = require('express');
const router = express.Router();
const kegiatanController = require('../controllers/kegiatanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', kegiatanController.getKegiatans);
router.get('/:id', kegiatanController.getKegiatanDetail);
router.post('/upload', authMiddleware, kegiatanController.createKegiatan);
router.put('/:id', authMiddleware, kegiatanController.updateKegiatan);
router.delete('/:id', authMiddleware, kegiatanController.deleteKegiatan);

module.exports = router;

