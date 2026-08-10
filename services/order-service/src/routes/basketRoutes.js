const express = require('express');
const router = express.Router();
const { getBasket, addItem, updateItem, removeItem } = require('../controllers/basketController');
const customerId = require('../middleware/customerId');

router.use(customerId);

router.get('/', getBasket);
router.post('/items', addItem);
router.put('/items/:cakeId', updateItem);
router.delete('/items/:cakeId', removeItem);

module.exports = router;
