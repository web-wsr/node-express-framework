var express = require('express');
var router = express.Router();
const userController = require('../../controllers/admin/userController');

// 发送验证码的路由
router.post('/sendCode', userController.sendCode);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/api/permissions/permissions', userController.getPermissions);

module.exports = router;