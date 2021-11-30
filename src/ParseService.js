/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2020.                                    *
 ******************************************************************************/

const multer = require( 'multer' );


function parseSingleFileFrom( fieldName ) {

    const storage = multer.memoryStorage();
    const fileSize = { fileSize: 6 * 1024 * 1024 };
    const fileFilter = function fileFilter( req, file, callBackFunction ) {
        let type = file.mimetype;
        let typeArray = type.split( "/" );
        if ( typeArray[ 0 ] === "image" &&
            ( typeArray[ 1 ] === "png" ||
                typeArray[ 1 ] === "jpg" ||
                typeArray[ 1 ] === "jpeg"
            ) ) {
            callBackFunction( null, true );
        } else {
            callBackFunction( null, false );
        }
    };
    const parseFromField = multer( {
        storage: storage,
        limits: fileSize,
        fileFilter: fileFilter,
    } );

    return parseFromField.single( fieldName );
}

/**
 * Create upload directory if not present already
 */


module.exports = {
    parseSingleFileFrom
};


