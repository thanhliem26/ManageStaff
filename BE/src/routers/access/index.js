'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

//sign up
router.post('/user/signup', asyncHandler(AccessController.signUp)); 
router.post('/user/login', asyncHandler(AccessController.login)); 

//authentication
router.use(authenticationV2);

//logout
router.post('/user/logout', asyncHandler(AccessController.logout));
router.post('/user/handleRefreshToken', asyncHandler(AccessController.handleRefreshToken));

module.exports = router;