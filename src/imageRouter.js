/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const multer = require( 'multer' )
const path = require( 'path' );
const express = require( 'express' );
const imageRouter = express.Router();

const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, path.resolve( 'uploads' ) )
    },
    filename: function ( req, file, cb ) {
        cb( null, file.originalname )
    }
} )

const upload = multer( { storage: storage } )

const avtarController = require( './imageController' );

// UPLOAD
imageRouter.post( '/photo', avtarController.handlePostRequest( 'avtar' ) );

imageRouter.post( '/profile', upload.single( 'profile' ), function ( req, res ) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' });

} );

imageRouter.post( '/pdf', upload.single( 'cv' ), function ( req, res ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' });
} );


// GET AVTAR
imageRouter.get( '/', avtarController.handleGetRequest() );

// GET AVTAR Thumbnail
imageRouter.get( '/tn', avtarController.handleGetThumbnailRequest() );

module.exports = imageRouter;

