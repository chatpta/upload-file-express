/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const multer = require( 'multer' )
const path = require( 'path' );
const express = require( 'express' );
const fileRouter = express.Router();

const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, path.resolve( 'uploads' ) )
    },
    filename: function ( req, file, cb ) {
        cb( null, file.originalname )
    }
} )

const upload = multer( { storage: storage } )

const avtarController = require( './controller' );

// UPLOAD
fileRouter.post( '/photo', avtarController.handlePostRequest( 'avtar' ) );

fileRouter.post( '/profile', upload.single( 'profile' ), function ( req, res ) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' });

} );

fileRouter.post( '/pdf', upload.single( 'cv' ), function ( req, res ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' });
} );


// GET AVTAR
fileRouter.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
fileRouter.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = fileRouter;

