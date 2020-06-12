const express = require('express');
const router = express.Router();
const posterController = require('../controllers/poster')
const passport = require('passport')
require('../helpers/passport')


const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/', posterController.getPosters)

router.get('/governorate', posterController.getGovernratePosters)

router.get('/category', posterController.getCategoryPosters)

router.get('/:posterId', passportJWT, posterController.getSinglePoster)

module.exports = router;





