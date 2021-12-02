/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2020.                                    *
 ******************************************************************************/

const multer = require( 'multer' );

/**
 * Returns a multer function to parse single file.
 * @param fieldNameCarryingFiles
 * @return {*}
 */
function parseSingleImageFileToMemoryFromField( fieldNameCarryingFiles ) {

    const parseFromFieldMulter = multer( {
        storage: multer.memoryStorage(),
        limits: maxAcceptableFileSizeInMB( 4 ),
        fileFilter: acceptableTypeFileTypeFilter,
    } );

    return parseFromFieldMulter.single( fieldNameCarryingFiles );
}

//===================================
// Private functions below this line.
//===================================
/**
 * Max file size if 4 Mb.
 * @param MB
 * @return {{fileSize: number}}
 */
function maxAcceptableFileSizeInMB( MB ) {
    if ( Number.isInteger( MB ) && MB >= 0 && MB <= 4 ) {
        return { fileSize: MB * 1024 * 1024 }
    } else {
        return { fileSize: 4 * 1024 * 1024 }
    }
}

/**
 * Decides acceptable file types.
 * @param req
 * @param file
 * @param callBackFunction
 */
function acceptableTypeFileTypeFilter( req, file, callBackFunction ) {
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
}

module.exports = {
    parseSingleImageFileToMemoryFromField
};


