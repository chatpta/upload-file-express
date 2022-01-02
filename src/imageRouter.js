/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
const express = require( 'express' );
const imageRouter = express.Router();

const avtarController = require( './imageController' );

// UPLOAD
imageRouter.post( '/photo', avtarController.handlePostRequest( 'avtar' ) );

// GET AVTAR
imageRouter.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
imageRouter.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = imageRouter;

