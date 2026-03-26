const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

// THÊM DÒNG NÀY ĐỂ TẠO ĐƯỜNG DẪN TRA CỨU:
router.get('/:id/profile', controller.getProfile);
//


router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;