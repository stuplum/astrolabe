describe('Base', function() {

    var mockProtractor, Base, base;

    beforeEach(function() {

        mockProtractor = {
            By: 'protractor "By" property',
            getInstance: sinon.stub()
        };

        Base = Sandbox.require('../lib/astrolabe/base', {
            globals: { protractor: mockProtractor }
        });

        global.protractor = mockProtractor;

        base = new Base();
    });

    it('should have a by property', function() {
        base.by.should.be.string('protractor "By" property');
    });

    it('should have a browser instance', function() {

        mockProtractor.getInstance.returns('browser instance');

        base.browser.should.be.string('browser instance');
    });
});