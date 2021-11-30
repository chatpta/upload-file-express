/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
const imageResizeAndStoreService = require( "./imageResizeAndStoreService" );


module.exports.handleAvtarSave =  async ( req, res, next ) => {
    if ( !req.file ) return next();
    if ( req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg' ) {
        return next( new Error( 'File format is not supported' ) );
    }
    req.file.storedFilename = await imageResizeAndStoreService.store( req );
    return next()
};


module.exports.createAvtarNameAndPath = async ( req, res, next ) => {
    await imageResizeAndStoreService.createAvtarFilename( req );
    return next();
};


