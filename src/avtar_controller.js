/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );
const parseService = require( "./ParseService" );


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

// const handlePostRequestAvtar = ( req, res, next ) => {
//     return new Promise.resolve()
//         .then( () => {
//             parseService.parseSingleImageFileFromField( 'avtar' )( req, res, next );
//         } )
//         .then();
// };

module.exports = {
    sendCreateResponse,
    sendReadResponseAvtar,
    sendReadResponseThumbnail,
};

