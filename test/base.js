describe('Base', function() {

    var Base;

    beforeEach(function() {

        this.mockProtractor = {
            By: 'protractor "By" property'
        };

        Base = Sandbox.require('../lib/astrolabe/base', {
            globals: { protractor: this.mockProtractor,
                       browser: 'driver instance' }
        });

        this.base = new Base();
    });

    it('should have a by property', function() {
        this.base.by.should.be.string('protractor "By" property');
    });

    it('should have a driver instance', function() {
        this.base.driver.should.be.string('driver instance');
    });

    it('should extend the base class', function() {

        var Extended = Base.extend({
            newProp: { value: 'new prop value' },
            newFunc: { value: function() { return 'new func value'} }
        });

        var extended = new Extended();

        expect(extended).to.be.an.instanceof(Base);

        expect(extended.newProp).to.be.a.string('new prop value');
        expect(extended.newFunc()).to.be.a.string('new func value');
    });

    it('should extend an already extended class', function() {

        var SubClass = Base.extend(),
            SubSubClass = SubClass.extend();

        expect(new SubClass()).to.be.an.instanceof(Base);
        expect(new SubSubClass()).to.be.an.instanceof(SubClass);
    });

    it('should create an instance of an extended class', function() {

        var subClass = Base.create({
            newProp: { value: 'new prop value' },
            newFunc: { value: function() { return 'new func value'; } }
        });

        expect(subClass).to.be.an.instanceof(Base);

        expect(subClass.newProp).to.be.a.string('new prop value');
        expect(subClass.newFunc()).to.be.a.string('new func value');
    });

    it('should create an instance of an previously extended class', function() {

        var SubClass, subSubClass;

        SubClass = Base.extend({
            prop1: { value: 'prop1' },
            prop2: { value: 'prop2' }
        });

        subSubClass = SubClass.create(function() {
                this.prop4 = 'prop4';
            },{
                prop2: { value: 'newProp2' },
                prop3: { value: 'prop3' }
            });

        expect(subSubClass).to.be.an.instanceof(SubClass);

        expect(subSubClass.prop1).to.be.a.string('prop1');
        expect(subSubClass.prop2).to.be.a.string('newProp2');
        expect(subSubClass.prop3).to.be.a.string('prop3');
        expect(subSubClass.prop4).to.be.a.string('prop4');
    });

});
