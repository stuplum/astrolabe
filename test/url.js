var URL = require('../lib/astrolabe/utils/url');

describe('URL', function() {

    beforeEach(function() {
        this.url = new URL('base');
    });

    describe('addPath', function() {

        it('should add a path to a base url', function() {

            this.url.addPath('test');

            expect(this.url.url).to.have.string('base/test');
        });

        it('should add a multiple paths to a base url', function() {

            this.url.addPath('test', 'another');

            expect(this.url.url).to.have.string('base/test/another');
        });

    });

    describe('addParam', function() {

        it('should add a query param to a base url', function() {

            this.url.addParams({test:'test'});

            expect(this.url.url).to.have.string('base?test=test');
        });

        it('should add a query param to a base url', function() {

            this.url.addParams({ test: 'test', another: 'another' });

            expect(this.url.url).to.have.string('base?test=test&another=another');
        });
    });

    describe('method chaining', function() {

        it('should allow chaining of paths and params', function() {

            this.url.addParams({ test: 'test' }).addPath('testme').addParams({ another: 'another' });

            expect(this.url.url).to.have.string('base/testme?test=test&another=another');
        });
    })
});