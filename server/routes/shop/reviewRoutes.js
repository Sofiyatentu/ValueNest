const express = require('express');
const { getProductReviews, addProductReview } = require('../../controllers/reviewController');

const router = express.Router();

router.get('/get/:productId', getProductReviews);
router.post('/add', addProductReview);

module.exports = router;
