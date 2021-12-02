/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );
const parseService = require( "./ParseService" );


function handlePostRequest() {
    return [
        parseService.parseSingleImageFileFromField( 'avtar' ),
        imageResizeAndStoreService.handleResizeAndSaveAvtar,
        _sendCreateResponse
    ];
}

function handleGetRequest() {
    return [
        imageResizeAndStoreService.createAvtarNameAndPath,
        _sendReadResponseAvtar
    ];
}

function handleGetThumbnailRequest() {
    return [
        imageResizeAndStoreService.createAvtarNameAndPath,
        _sendReadResponseThumbnail
    ];
}

/********************************
 * Private functions below this *
 ********************************/
const _sendCreateResponse = function ( req, res ) {
    res.setHeader( 'Content-Type', 'application/json' );
    res.json( { message: req.file.originalname + ' is uploaded successfully' } );
};

const _sendReadResponseAvtar = function ( req, res ) {
    res.type( 'png' );
    return res.sendFile( req.avtarFilepath );
};

const _sendReadResponseThumbnail = async function ( req, res ) {
    res.type( 'png' );
    const tn = await imageResizeAndStoreService.thumbnail( req.avtarFilename );
    return res.end( tn, 'binary' );
};


module.exports = {
    handlePostRequest,
    handleGetRequest,
    handleGetThumbnailRequest
};

