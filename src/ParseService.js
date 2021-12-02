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
function parseSingleImageFileFromField( fieldNameCarryingFiles ) {

    const parseFromFieldMulter = multer( {
        //dest: '/Users/pulkitbadhwar/Desktop/work/nodeJS/upload-file-express/uploads' ,
        limits: maxAcceptableFileSizeInMB( 4 ),
        fileFilter: acceptableTypeFileTypeFilter,
        storage: storage,
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
    if ( Number.isInteger( MB ) && MB >= 0 && MB <= 5 ) {
        return { fileSize: MB * 1024 * 1024 }
    } else {
        return { fileSize: 5 * 1024 * 1024 }
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
    if ( typeArray[ 0 ] === "application" &&
        ( typeArray[ 1 ] === "pdf"
        ) ) {
        callBackFunction( null, true );
    } else {
        callBackFunction( null, false );
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Users/pulkitbadhwar/Desktop/work/nodeJS/upload-file-express/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
})

module.exports = {
    parseSingleImageFileFromField
};


