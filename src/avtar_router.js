/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const router = express.Router();

const avtar_c = require( './avtar_controller' );
const parseService = require( './ParseService' );
const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );


// Initiate avtar service and set upload directory


// UPLOAD AVTAR
// Private: Upload avtar image for the user in the token
router.post( '/',
    parseService.parseSingleImageFileFromField( 'avtar' ),
    imageResizeAndStoreService.handleResizeAndSaveAvtar,
    avtar_c.sendCreateResponse );

// GET AVTAR
// Private: Read avtar image for the user in the token
router.get( '/',
    imageResizeAndStoreService.createAvtarNameAndPath,
    avtar_c.sendReadResponseAvtar );

// GET AVTAR Thumbnail
// Private: Read avtar image for the user in the token
router.get( '/tn',
    imageResizeAndStoreService.createAvtarNameAndPath,
    avtar_c.sendReadResponseThumbnail );

module.exports = router;

