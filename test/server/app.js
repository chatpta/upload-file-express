const express = require( 'express' );
// const uploadService = require( '../../src/UploadService' );
const avtarRouter = require( '../../src/router' );

const app = express();
// const us = new uploadService();

app.post( '/', avtarRouter );

app.use( function ( req, res, next ) {
    res.status( 404 );
    res.json( { text: "file not found" } );
} );

app.use( function ( err, req, res, next ) {
    console.log( err.stack );
    res.status( 500 );
    res.json( { text: "Something is wrong" } );
} );

module.exports = app;
