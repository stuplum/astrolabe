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

    it('should have a driver instance', function() {

        this.mockProtractor.getInstance.returns('driver instance');

        this.base.driver.should.be.string('driver instance');
    });
});