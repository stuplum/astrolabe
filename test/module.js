describe('Module', function() {

    var ctxFindElementStub, ctxFindElementsStub;

    beforeEach(function() {

        var mockDriver = {
            findElement: sinon.stub(),
            findElements: sinon.stub()
        };

        global.protractor = {
            By: 'protractor "By" property',
            getInstance: function() { return mockDriver; }
        };

        var Module = require('../lib/astrolabe/module');

        ctxFindElementStub  = sinon.stub();
        ctxFindElementsStub = sinon.stub();

        this.module = new Module({
            findElement: ctxFindElementStub,
            findElements: ctxFindElementsStub
        });
    });

    afterEach(function() {
        global.protractor = undefined;
    });

    it('should find an element', function() {

        this.module.findElement('moduleFindElementBy');

        ctxFindElementStub.should.have.been.calledWithExactly('moduleFindElementBy');

        this.module.driver.findElement.should.not.have.been.called;
    });

    it('should find elements', function() {

        this.module.findElements('moduleFindElementsBy');

        ctxFindElementsStub.should.have.been.calledWithExactly('moduleFindElementsBy');

        this.module.driver.findElement.should.not.have.been.called;
    });
});