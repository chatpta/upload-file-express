/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const router = express.Router();
const path = require( 'path' );

const avtar_c = require( './avtar_controller' );
const avtar_m = require( './avtar_middleware' );
const avtar_s = require( './AvtarService' );
const parseService = require( './ParseService' );

// Initiate avtar service and set upload directory
const avtarHandlerService = new avtar_s( path.resolve( __dirname, '..', 'uploads' ) );

// UPLOAD AVTAR
// Private: Upload avtar image for the user in the token
router.post( '/',
    parseService.parseSingleFileFrom( 'avtar' ),
    avtar_m.handleAvtarSave( avtarHandlerService ),
    avtar_c.sendCreateResponse );

// GET AVTAR
// Private: Read avtar image for the user in the token
router.get( '/',
    avtar_m.createAvtarNameAndPath( avtarHandlerService ),
    avtar_c.sendReadResponseAvtar );

// GET AVTAR Thumbnail
// Private: Read avtar image for the user in the token
router.get( '/tn',
    avtar_m.createAvtarNameAndPath( avtarHandlerService ),
    avtar_c.sendReadResponseThumbnail( avtarHandlerService ) );

module.exports = router;

