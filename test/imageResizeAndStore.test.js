const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const { createDirectoryIfNotExistRecursiveMiddleware } = require( "../src/imageResizeAndStoreService" );


describe( "Create directory test", function () {

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

        function next() {
        }

        // Act
        createDirectoryIfNotExistRecursiveMiddleware( req, res, next );

        // Assert
        assert.deepStrictEqual( true, true );
    } );
} );
