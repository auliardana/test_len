const express = require('express');

const mahasiswaApi = require('./mahasiswa');
const bookApi = require('./book');
const rentApi = require('./rent');

const router = express.Router();

router.use(mahasiswaApi);
router.use(bookApi);
router.use(rentApi);

module.exports = router;
