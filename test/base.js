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
            newProp: { writable: false, value: 'new prop value' },
            newFunc: { writable: false, value: function() { return 'new func value'} }
        });

        var extended = new Extended();

        expect(extended).to.be.an.instanceof(Base);

        expect(extended.newProp).to.be.a.string('new prop value');
        expect(extended.newFunc()).to.be.a.string('new func value');
    });

    it.only('should extend an already extended class', function() {

        var SubClass    = Base.extend({}),
            SubSubClass = SubClass.extend({});

        expect(new SubClass()).to.be.an.instanceof(Base);
        expect(new SubSubClass()).to.be.an.instanceof(SubClass);
    });

    it('should create an instance of an extended class', function() {

        var subClass = Base.create({
            newProp: { writable: false, value: 'new prop value' },
            newFunc: { writable: false, value: function() { return 'new func value'; } }
        });

        expect(subClass).to.be.an.instanceof(Base);

        expect(subClass.newProp).to.be.a.string('new prop value');
        expect(subClass.newFunc()).to.be.a.string('new func value');
    });

    it('should create an instance of an previously extended class', function() {

        var SubClass, subSubClass;

        SubClass = Base.extend({
            newProp: { writable: false, value: 'sub prop value' }
        });

        subSubClass = SubClass.create({
            newProp: { writable: false, value: 'sub sub prop value' }
        });

        expect(subSubClass).to.be.an.instanceof(SubClass);

        expect(subSubClass.newProp).to.be.a.string('sub sub prop value');
    });

});