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
const ImageResizeAndStoreService = require( './imageResizeAndStoreService' );
const parseService = require( './ParseService' );

// Initiate avtar service and set upload directory
const imageResizeAndStoreService = new ImageResizeAndStoreService( path.resolve( __dirname, '..', 'uploads' ) );

// UPLOAD AVTAR
// Private: Upload avtar image for the user in the token
router.post( '/',
    parseService.parseSingleFileFromField( 'avtar' ),
    avtar_m.handleAvtarSave( imageResizeAndStoreService ),
    avtar_c.sendCreateResponse );

// GET AVTAR
// Private: Read avtar image for the user in the token
router.get( '/',
    avtar_m.createAvtarNameAndPath( imageResizeAndStoreService ),
    avtar_c.sendReadResponseAvtar );

// GET AVTAR Thumbnail
// Private: Read avtar image for the user in the token
router.get( '/tn',
    avtar_m.createAvtarNameAndPath( imageResizeAndStoreService ),
    avtar_c.sendReadResponseThumbnail( imageResizeAndStoreService ) );

module.exports = router;

