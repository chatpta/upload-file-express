const fs = require( 'fs' );
const path = require( 'path' );
const request = require( 'supertest' );
const { describe, it, after } = require( 'mocha' );

const app = require( './server/app' );
const fileName = 'sample.pdf';
const filePath = __dirname + '/fixture/' + fileName;

describe( 'Upload Service Tests', function () {

    after( function () {
        fs.unlink( path.resolve( 'uploads/', fileName ), function ( error ) {
            if ( error ) {
                console.error( error );
            }
        } );
    } );

    describe( 'POST / ', function () {
        it( 'Uploads the pdf file', function () {
            return request( app )
                .post( '/' )
                .attach( 'sample', filePath )
                .expect( 200 )
                .expect( 'Content-Type', /json/ )
                .expect( `{"message":"${ fileName } is uploaded successfully"}` )
        } );
    } );

    describe( 'GET / ', function () {
        it( 'File not found', function () {
            return request( app )
                .get( '/' + fileName )
                .expect( 404 )
                .expect( 'Content-Type', /json/ )
                .expect( '{"text":"file not found"}' )
        } );
    } );
} );

