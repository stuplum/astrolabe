describe('Base', function() {

    beforeEach(function() {

        this.mockProtractor = {
            By: 'protractor "By" property',
            getInstance: sinon.stub()
        };

        var Base = Sandbox.require('../lib/astrolabe/base', {
            globals: { protractor: this.mockProtractor }
        });

        this.base = new Base();
    });

    it('should have a by property', function() {
        this.base.by.should.be.string('protractor "By" property');
    });

    it('should have a browser instance', function() {

        this.mockProtractor.getInstance.returns('browser instance');

        this.base.browser.should.be.string('browser instance');
    });
});