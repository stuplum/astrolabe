describe('Base', function() {

    var Base;

    beforeEach(function() {

        this.mockProtractor = {
            By: 'protractor "By" property',
            getInstance: sinon.stub()
        };

        Base = Sandbox.require('../lib/astrolabe/base', {
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

    it('should extend the base class', function() {

        var Extended = Base.extend({
            newProp: { writable: false, enumerable: false, value: 'new prop value' }
        });

        expect(new Extended()).to.be.an.instanceof(Base);
    });

    it('should extend the base class with functions', function() {

        var Extended = Base.extend({}, {
            newFunc: sinon.stub()
        });

        var extended = new Extended();

        extended.newFunc('test');

        extended.newFunc.should.have.been.calledWithExactly('test');
    });

    it('should extend an already extended class', function() {

        var Extended, ExtendedAgain;

        Extended = Base.extend({
            newProp: { writable: false, enumerable: false, value: 'new prop value' }
        });

        ExtendedAgain = Extended.extend({
            anotherNewProp: { writable: false, enumerable: false, value: 'another new prop value' }
        });

        expect(new Extended()).to.be.an.instanceof(Base);
        expect(new ExtendedAgain()).to.be.an.instanceof(Extended);
    });

    it('should create an instance of an extended class', function() {

        var extended = Base.create({
            newProp: { writable: false, enumerable: false, value: 'new prop value' },
            newFunc: sinon.stub()
        });

        expect(extended).to.be.an.instanceof(Base);
    });

    it('should create an instance of an previously extended class', function() {

        var Extended, extendedAgain;

        Extended = Base.extend({
            newProp: { writable: false, enumerable: false, value: 'new prop value' }
        });

        extendedAgain = Extended.create({
            anotherNewProp: { writable: false, enumerable: false, value: 'new prop value' },
            newFunc: sinon.stub()
        });

        expect(extendedAgain).to.be.an.instanceof(Extended);
    });

    it('should create an instance with functions', function() {

        var extended = Base.create({}, {
            newFunc: sinon.stub()
        });

        extended.newFunc('testInstance');

        extended.newFunc.should.have.been.calledWithExactly('testInstance');
    });

});