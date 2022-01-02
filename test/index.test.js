const fs = require( 'fs' );
const path = require( 'path' );
const request = require( 'supertest' );
const { describe, it, after } = require( 'mocha' );

const app = require( './server/app' );
const photoFile = 'niagra_falls.jpg';
const photoFilePath = __dirname + '/fixture/' + photoFile;


describe( 'Upload Service Tests', function () {

    after( function () {
        fs.unlink( path.resolve( 'uploads/', photoFile ), function ( error ) {
            if ( error ) {
                console.error( error );
            }
        } );
    } );

    describe( 'POST /photo ', function () {
        it( 'Uploads the jpg photo file', function () {
            return request( app )
                .post( '/photo' )
                .attach( 'avtar', photoFilePath )
                .expect( 200 )
                .expect( 'Content-Type', /json/ )
                .expect( `{"message":"${ photoFile } is uploaded successfully"}` )
        } );
    } );

    describe( 'GET / ', function () {
        it( 'File not found', function () {
            return request( app )
                .get( '/' + photoFile )
                .expect( 404 )
                .expect( 'Content-Type', /json/ )
                .expect( '{"text":"file not found"}' )
        } );
    } );
} );

