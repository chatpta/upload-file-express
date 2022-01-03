const { describe, it, after } = require( "mocha" );
const assert = require( "assert" );
const { createDirectoryIfNotExistRecursiveMiddleware } = require( "../src/imageResizeAndStoreService" );
const fs = require( "fs" );


describe( "Create directory test", function () {


    after( 'Remove directory', () => {
        fs.rmdir( '/Users/peterpris/chatpta/upload-file-express/uploads/8B0DB877A6B34A23A493E687915CDD87',
            function () {
            } );
    } );

    it( "createDirectory", function () {

        // Arrange
        const req = {
            jwt: {
                header: { alg: 'sha512', typ: 'JWT' },
                payload: {
                    iat: 1638662314993,
                    client_id: '8b0db877-a6b3-4a23-a493-e687915cdd87',
                    roles: []
                }
            }
        };

        const res = {};

        function next( arg ) {
        }

        // Act
        createDirectoryIfNotExistRecursiveMiddleware( req, res, next );

        // Assert
        assert.deepStrictEqual( req.userDirNameAbsolutePath,
            '/Users/peterpris/chatpta/upload-file-express/uploads/8B0DB877A6B34A23A493E687915CDD87' );
    } );
} );
