'use strict';

var express = require('express');
var controller = require('./profile.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.update);
router.post('/', controller.create);

module.exports = router;
