/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const express = require( 'express' );
const fileRouter = express.Router();

const avtarController = require( './controller' );

// UPLOAD AVTAR
fileRouter.post( '/photo', avtarController.handlePostRequest() );

// GET AVTAR
fileRouter.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
fileRouter.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = fileRouter;

