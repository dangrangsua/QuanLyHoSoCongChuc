const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeRelativeController');

router.get('/', controller.getAll);
router.post('/', controller.create);
// Nhận 2 tham số để xác định đúng dòng dữ liệu
router.put('/:empId/:relId', controller.update);
router.delete('/:empId/:relId', controller.delete);

module.exports = router;