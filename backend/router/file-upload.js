const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', async (req, res) => {
    singleUpload(req, res, (err) => {
        return res.json({'imageUrl': req.file.location})
    });
});

module.exports = router;