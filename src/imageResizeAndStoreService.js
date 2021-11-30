/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const sharp = require( 'sharp' );
const util = require( 'util' );
const path = require( 'path' );
const fs = require( 'fs' );

const fsUnlink = util.promisify( fs.unlink );
const imageSaveDirectory = path.resolve( __dirname, '..', 'uploads' );


class ImageResizeAndStoreService {

    async store( req ) {

        const fileName = ImageResizeAndStoreService.fileName( req );
        const filepath = this.filepath( fileName );

        if ( fs.existsSync( filepath ) ) {
            await this.delete( fileName )
        }

        await sharp( req.file.buffer ).resize( 300, 300, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        } )
            .toFile( filepath );

        return fileName;
    }

    static fileName( req ) {
        if ( req.user && req.user.id ) {
            return `avtar-${ req.user.id }.png`;
        } else {
            return req.file.originalname;
        }
    }

    filepath( fileName ) {
        return path.resolve( `${ imageSaveDirectory }/${ fileName }` )
    }

    async delete( fileName ) {
        return fsUnlink( this.filepath( fileName ) );
    }

    async createAvtarFilename( req ) {
        req.avtarFilename = req.file.originalname;
        req.avtarFilepath = this.filepath( req.avtarFilename );
    }

    async thumbnail( filename ) {
        return sharp( this.filepath( filename ) )
            .resize( 50, 50 )
            .toBuffer();
    }

}

module.exports = ImageResizeAndStoreService;



