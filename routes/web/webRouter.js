var express = require('express');
var router = express.Router();

const userInfoController=require('../../controllers/web/userInfoController');


router.get('/users/user-info', userInfoController.index);

module.exports = router;