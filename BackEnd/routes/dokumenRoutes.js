const express = require('express')
const router = express.Router()
const dokumenController = require('../controllers/dokumenController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', dokumenController.getDocuments)
router.get('/:id/download', dokumenController.downloadDocument)
router.post('/upload', authMiddleware, dokumenController.uploadDocument)
router.delete('/:id', authMiddleware, dokumenController.deleteDocument)

module.exports = router