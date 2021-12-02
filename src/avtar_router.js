/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const router = express.Router();

const avtarController = require( './avtar_controller' );

// UPLOAD AVTAR
router.post( '/', avtarController.handlePostRequest() );

// GET AVTAR
router.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
router.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = router;

