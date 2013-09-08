describe('Module', function() {

    var findElementStub, findElementsStub, mockBase, Module, module;

    beforeEach(function() {

        findElementStub  = sinon.stub();
        findElementsStub = sinon.stub();

        mockBase = function() {
            this.findElement  = findElementStub;
            this.findElements = findElementsStub;
        };

        Module = Sandbox.require('../lib/astrolabe/module', {
            requires: { "./base": mockBase }
        });

        module = new Module();
    });

    it('should find an element', function() {

        module.findElement('by');

        findElementStub.should.have.been.calledWithExactly('by');
    });

    it('should find elements', function() {

        module.findElements('by');

        findElementsStub.should.have.been.calledWithExactly('by');
    });
});