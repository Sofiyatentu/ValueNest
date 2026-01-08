const express = require('express');
const { getFeatureImages, addFeatureImage } = require('../../controllers/featureController');

const router = express.Router();

router.get('/get', getFeatureImages);
router.post('/add', addFeatureImage);

module.exports = router;
