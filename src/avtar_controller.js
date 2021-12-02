/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );
const parseService = require( "./ParseService" );


function handlePostRequest() {
    return [ parseService.parseSingleImageFileFromField( 'avtar' ),
        imageResizeAndStoreService.handleResizeAndSaveAvtar,
        sendCreateResponse ];
}

function handleGetRequest() {
    return [ imageResizeAndStoreService.createAvtarNameAndPath,
        sendReadResponseAvtar ];
}

function handleGetThumbnailRequest() {
    return [ imageResizeAndStoreService.createAvtarNameAndPath,
        sendReadResponseThumbnail ];
}

const sendCreateResponse = function ( req, res ) {
    res.statusCode = 200;
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' } );
};

const sendReadResponseAvtar = function ( req, res ) {
    res.statusCode = 200;
    res.type( 'png' );
    return res.sendFile( req.avtarFilepath );
};

const sendReadResponseThumbnail = async function ( req, res ) {
    res.statusCode = 200;
    res.type( 'png' );
    const tn = await imageResizeAndStoreService.thumbnail( req.avtarFilename );
    return res.end( tn, 'binary' );
};


module.exports = {
    handlePostRequest,
    handleGetRequest,
    handleGetThumbnailRequest
};

