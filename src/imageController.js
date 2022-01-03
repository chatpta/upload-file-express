/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );
const parseService = require( "./imageParseService" );


function handlePostRequestSingleImageFile( fieldName) {
    return [
        parseService.parseSingleImageFileToMemoryFromField( fieldName ),
        imageResizeAndStoreService.handleResizeAndSaveAvtarMiddleware,
        _sendCreateResponse
    ];
}

function handleGetRequest() {
    return [
        imageResizeAndStoreService.createAvtarNameAndPathMiddleware,
        _sendReadResponseAvtar
    ];
}

function handleGetThumbnailRequest() {
    return [
        imageResizeAndStoreService.createAvtarNameAndPathMiddleware,
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
    const tn = await imageResizeAndStoreService.thumbnailPromise( req.avtarFilename );
    return res.end( tn, 'binary' );
};


module.exports = {
    handlePostRequest: handlePostRequestSingleImageFile,
    handleGetRequest,
    handleGetThumbnailRequest
};

