const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const { multerConfigPhotos } = require('../services/multer')
const { addPOsterValidationRules, validate } = require('../helpers/validation')
const passport = require('passport')
require('../helpers/passport')


const passportJWT = passport.authenticate('jwt', { session: false });

// add poster routes 

/**
//  * @swagger
//  * /admin/add_poster:
//  *    post:
//  *      description: add new poster
//  *      produces:
//  *      - "application/json"
//  *      - "application/xml"
//  *    parameters:
//  *      - in: body
//  *        name: body
//  *        description: form of new poster
//  *        required: true
//  *        schema:
//  *          $ref: "#/definitions/Order"items:
//  *    responses:
//  *      '200':
//  *        description: Successfully fetched posters
//  */

router.post('/add_poster', passportJWT, multerConfigPhotos, addPOsterValidationRules(), validate, adminController.addPoster)

router.get('/my_posters', passportJWT, adminController.getMyPoster)


// /**
//  * @swagger
//  * /admin/{posterId}:
//  *    get:
//  *      description: Use to return single poster in admin page to manipulate 
//  *    parameters:
//  *      - name: posterId
//  *        in: path
//  *        description: ID of Poster 
//  *    responses:
//  *      '200':
//  *        description: Successfully fetched posters
//  */


router.get('/:posterId', passportJWT, adminController.getSinglePoster)


// dlete poster route
// /**
//  * @swagger
//  * /admin/{posterId}:
//  *    delete:
//  *      description: Use to return single poster in admin page to manipulate 
//  *    parameters:
//  *      - name: posterId
//  *        in: path
//  *        description: ID of Poster 
//  *    responses:
//  *      '200':
//  *        description: Successfully fetched posters
//  */

router.delete('/:posterId', passportJWT, adminController.deletePoster)

// /**
//  * @swagger
//  * /admin/add_poster:
//  *    put:
//  *      description: UPdate poster
//  *      produces:
//  *      - "application/json"
//  *      - "application/xml"
//  *    parameters:
//  *      - name: 
//  *        in: body
//  *        description: form of new poster
//  *        required: true
//  *        schema:
//  *          $ref: "#/definitions/Order"items:
//  *    responses:
//  *      '200':
//  *        description: Successfully fetched posters
//  */

router.put('/:posterId', passportJWT, multerConfigPhotos, adminController.updatePoster)


module.exports = router;


// /**
//  * @swagger
//  * /poster/governrate:
//  *    get:
//  *      description: Use to return all Governrate posters
//  *    parameters:
//  *      - name: type
//  *        in: "query"
//  *        description: Name of type Posters
//  *        required: true
//  *        type: "array"
//  *        items:
//  *         type: "string"
//  *         enum:
//  *         - "Services"
//  *         - "job"
//  *         - "property"
//  *         - "journeys"
//  *         - "Furniture"
//  *        default: "Arish"
//  *        collectionFormat: "multi"
//  *    responses:
//  *      '200':
//  *        description: Successfully fetched posters
//  */

