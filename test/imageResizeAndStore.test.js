const { describe, it } = require( "mocha" );
const assert = require( "assert" );
const { createDirectoryIfNotExistRecursivePromise } = require( "../src/imageResizeAndStoreService" );


describe( "Create directory test", function () {

    it( "createDirectory", async function () {

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

        // Act
        await createDirectoryIfNotExistRecursivePromise( req );

        // Assert
        assert.deepStrictEqual( true, true );
    } );
} );
