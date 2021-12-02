/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const fileRouter = express.Router();

const avtarController = require( './controller' );

// UPLOAD
fileRouter.post( '/photo', avtarController.handlePostRequest( 'avtar' ) );

fileRouter.post( '/profile', avtarController.handlePostRequest( 'profile' ) );

// GET AVTAR
fileRouter.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
fileRouter.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = fileRouter;

