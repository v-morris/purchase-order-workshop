const express = require('express');
const { getVendors } = require('../controllers/vendor.controller');

const router = express.Router();

router.get('/', getVendors);

module.exports = router;
