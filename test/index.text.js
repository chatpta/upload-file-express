const fs = require( 'fs' );
const path = require( 'path' );
const request = require( 'supertest' );
const { describe, it, after } = require( 'mocha' );

const app = require( './server/app' );
const fileName = 'niagra_falls.jpg';
const filePath = __dirname + '/fixture/' + fileName;

describe( 'Upload Service Tests', function () {

    after( function () {
        fs.unlink( path.resolve( 'uploads/', fileName ),
            ( err, result ) => {
                console.log( err );
            } );
    } );

    describe( 'POST / ', function () {
        it( 'Uploads the jpg photo file', function () {
            return request( app )
                .post( '/' )
                .attach( 'avtar', filePath )
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

