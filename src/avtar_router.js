/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const router = express.Router();

const avtar_c = require( './avtar_controller' );
const avtar_m = require( './avtar_middleware' );
const parseService = require( './ParseService' );

// Initiate avtar service and set upload directory


// UPLOAD AVTAR
// Private: Upload avtar image for the user in the token
router.post( '/',
    parseService.parseSingleFileFromField( 'avtar' ),
    avtar_m.handleAvtarSave,
    avtar_c.sendCreateResponse );

// GET AVTAR
// Private: Read avtar image for the user in the token
router.get( '/',
    avtar_m.createAvtarNameAndPath,
    avtar_c.sendReadResponseAvtar );

// GET AVTAR Thumbnail
// Private: Read avtar image for the user in the token
router.get( '/tn',
    avtar_m.createAvtarNameAndPath,
    avtar_c.sendReadResponseThumbnail );

module.exports = router;

