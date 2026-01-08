const express = require('express');
const {
  getAllOrdersAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require('../../controllers/adminOrderController');
const router = express.Router();
router.get('/get-all', getAllOrdersAllUser);
router.get('/details/:id', getOrderDetailsForAdmin);
router.put('/update/:id', updateOrderStatus);
module.exports = router;
