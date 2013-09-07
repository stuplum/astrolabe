var Module = require('../lib/astrolabe/module');

describe('Module', function() {

    var mockBase, Module, module;

    beforeEach(function() {

        mockBase = function() {
            this.browser = {
                findElement: sinon.stub(),
                findElements: sinon.stub()
            };
        };

        Module = Sandbox.require('../lib/astrolabe/module', {
            requires: {
                "./base": mockBase
            }
        });

        module = new Module();
    });

    it('should find an element', function() {

        module.findElement('by');

        module.browser.findElement.should.have.been.calledWithExactly('by');
    });

    it('should find elements', function() {

        module.findElements('by');

        module.browser.findElements.should.have.been.calledWithExactly('by');
    });
});