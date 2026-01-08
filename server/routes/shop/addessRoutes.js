const {
  fetchAddress,
  addAddress,
  editAddress,
  deleteAddress,
} = require('../../controllers/addressController');

const express = require('express');
const router = express.Router();

router.get('/get/:userId', fetchAddress);
router.post('/add', addAddress);
router.put('/edit/:userId/:addressId', editAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = router;
