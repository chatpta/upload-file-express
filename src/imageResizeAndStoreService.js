/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const sharp = require( 'sharp' );
const util = require( 'util' );
const path = require( 'path' );
const fs = require( 'fs' );
const fsPromises = require( 'fs/promises' )

const fsUnlink = util.promisify( fs.unlink );
const imageSaveDirectory = path.resolve( __dirname, '..', 'uploads' );


async function resizeAndStoreAvtar( req ) {
    const fileName = createFileName( req );
    const filepath = createFilePath( fileName );

    if ( fs.existsSync( filepath ) ) {
        await this.delete( fileName )
    }

    await sharp( req?.file?.buffer ).resize( 300, 300, {
        fit: sharp?.fit?.inside,
        withoutEnlargement: true
    } )
        .toFile( filepath );

    return fileName;
}

function createFileName( req ) {
    if ( req?.user?.id ) {
        return `avtar-${ req?.user?.id }.png`;
    } else {
        return req?.file?.originalname;
    }
}

function createDirectoryIfNotExistRecursiveMiddleware( req, res, next ) {
    const userId = req?.jwt?.payload?.client_id
    if ( userId ) {

        const userDirName = removeDashAndCapitalize( userId );
        const userDirNameAbsolutePath = getUserDirectoryPath( userDirName );

        if ( !fs.existsSync( userDirNameAbsolutePath ) ) {
            fsPromises.mkdir( userDirNameAbsolutePath, {
                recursive: true,
                mode: 0o777
            } )
                .then( next )
                .catch( next );
        } else {
            next();
        }
    }
}

function getUserDirectoryPath( userDirName ) {

    return path.resolve( `${ imageSaveDirectory }/${ userDirName }` )

}

function removeDashAndCapitalize( id ) {

    return id.replace( /-/g, '' ).toUpperCase();

}

function createFilePath( fileName ) {
    return path.resolve( `${ imageSaveDirectory }/${ fileName }` )
}

function deleteFileSync( fileName ) {
    return fsUnlink( createFilePath( fileName ) );
}


async function createAvtarFilename( req ) {
    req.avtarFilename = req.file.originalname;
    req.avtarFilepath = createFilePath( req.avtarFilename );
}

async function thumbnailPromise( filename ) {
    return sharp( createFilePath( filename ) )
        .resize( 50, 50 )
        .toBuffer();
}

async function handleResizeAndSaveAvtarMiddleware( req, res, next ) {
    if ( !req?.file ) return next();
    if ( req?.file?.mimetype !== 'image/png' && req?.file?.mimetype !== 'image/jpeg' ) {
        return next( new Error( 'File format is not supported' ) );
    }
    req.file.storedFilename = await resizeAndStoreAvtar( req );
    return next()
}

async function createAvtarNameAndPathMiddleware( req, res, next ) {
    await createAvtarFilename( req );
    return next();
}

module.exports = {
    createDirectoryIfNotExistRecursiveMiddleware,
    handleResizeAndSaveAvtarMiddleware,
    createAvtarNameAndPathMiddleware,
    thumbnailPromise,
    deleteFileSync
};



