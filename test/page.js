describe('Page', function() {

    beforeEach(function() {

        var mockDriver = {
            get: sinon.stub(),
            getTitle: sinon.stub(),
            findElement: sinon.stub(),
            findElements: sinon.stub(),
            getCurrentUrl: sinon.stub(),
            addMockModule: sinon.stub(),
            clearMockModules: sinon.stub()
        };

        global.protractor = {
            By: 'protractor "By" property',
            getInstance: function() { return mockDriver; }
        };

        var mockSerializer = {
            serialize: sinon.stub().returns("serialized script")
        };

        this.mockURL = {
            url: 'fake/url',
            addPath: sinon.stub(),
            addParams: sinon.stub()
        };

        var Page = Sandbox.require('../lib/astrolabe/page', {
            requires: {
                "./utils/url": sinon.stub().withArgs('/').returns(this.mockURL),
                "./utils/serializer": sinon.stub().returns(mockSerializer)
            }
        });

        this.page = new Page();
    });

    it('should have a title', function() {

        this.page.driver.getTitle.returns('page title');

        this.page.title.should.be.string('page title');
    });

    it('should have a currentUrl', function() {

        this.page.driver.getCurrentUrl.returns('http://currentUrl.com');

        this.page.currentUrl.should.be.string('http://currentUrl.com');
    });

    it('should have a baseUrl', function() {

        this.page.driver.baseUrl = 'http://baseUrl.com';

        this.page.baseUrl.should.be.string('http://baseUrl.com');
    });

    it('should find an element', function() {

        this.page.findElement('pageFindElementBy');

        this.page.driver.findElement.should.have.been.calledWithExactly('pageFindElementBy');
    });

    it('should find elements', function() {

        this.page.findElements('pageFindElementsBy');

        this.page.driver.findElements.should.have.been.calledWithExactly('pageFindElementsBy');
    });

    describe('go', function() {

        it('should go to / by default', function() {

            this.page.go();

            this.page.driver.get.should.have.been.calledWithExactly('fake/url');
        });

        it('should add paths to base url', function() {

            this.page.go('testPath');

            this.mockURL.addPath.should.have.been.calledOnce;
            this.mockURL.addPath.should.have.been.calledWithExactly('testPath');

            this.mockURL.addParams.should.not.have.been.called;
        });

        it('should add params to base url', function() {

            this.page.go({ test: 'param' });

            this.mockURL.addParams.should.have.been.calledOnce;
            this.mockURL.addParams.should.have.been.calledWithExactly({ test: 'param' });

            this.mockURL.addPath.should.not.have.been.called;
        });

        it('should add paths and params to base url', function() {

            this.page.go('testPath', { test: 'param' }, 'anotherPath');

            this.mockURL.addPath.should.have.been.calledTwice;
            this.mockURL.addPath.firstCall.should.have.been.calledWithExactly('testPath');
            this.mockURL.addPath.secondCall.should.have.been.calledWithExactly('anotherPath');

            this.mockURL.addParams.should.have.been.calledOnce;
            this.mockURL.addParams.should.have.been.calledWithExactly({ test: 'param' });
        });
    });

    describe('mockModule', function() {

        it('should add a mock angular module', function() {

            this.page.mockModule('myModule', { test: "script" });

            this.page.driver.addMockModule.should.have.been.calledOnce;
            this.page.driver.addMockModule.should.have.been.calledWithExactly('myModuleMock', 'angular.module(\'myModuleMock\', []).value(\'myModule\', serialized script);');
        });
    });

    describe('clearMocks', function() {

        it('should clear all mock angular modules', function() {

            this.page.clearMocks();

            this.page.driver.clearMockModules.should.have.been.calledOnce;
        });
    });
});