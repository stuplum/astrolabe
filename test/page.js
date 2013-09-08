describe('Page', function() {

    var mockBase, mockSerializer, mockURL, Page, page;

    beforeEach(function() {

        mockBase = function() {
            this.browser = {
                get: sinon.stub(),
                getTitle: sinon.stub(),
                getCurrentUrl: sinon.stub(),
                addMockModule: sinon.stub(),
                clearMockModules: sinon.stub()
            };
        };

        mockSerializer = {
            serialize: sinon.stub().returns("serialized script")
        };

        mockURL = {
            url: 'fake/url',
            addPath: sinon.stub(),
            addParams: sinon.stub()
        };

        Page = Sandbox.require('../lib/astrolabe/page', {
            requires: {
                "./base": mockBase,
                "./utils/url": sinon.stub().withArgs('/').returns(mockURL),
                "./utils/serializer": sinon.stub().returns(mockSerializer)
            }
        });

        page = new Page();
    });

    it('should have a title', function() {

        page.browser.getTitle.returns('page title');

        page.title.should.be.string('page title');
    });

    it('should have a currentUrl', function() {

        page.browser.getCurrentUrl.returns('http://currentUrl.com');

        page.currentUrl.should.be.string('http://currentUrl.com');
    });

    describe('go', function() {

        it('should go to / by default', function() {

            page.go();

            page.browser.get.should.have.been.calledWithExactly('fake/url');
        });

        it('should add paths to base url', function() {

            page.go('testPath');

            mockURL.addPath.should.have.been.calledOnce;
            mockURL.addPath.should.have.been.calledWithExactly('testPath');

            mockURL.addParams.should.not.have.been.called;
        });

        it('should add params to base url', function() {

            page.go({ test: 'param' });

            mockURL.addParams.should.have.been.calledOnce;
            mockURL.addParams.should.have.been.calledWithExactly({ test: 'param' });

            mockURL.addPath.should.not.have.been.called;
        });

        it('should add paths and params to base url', function() {

            page.go('testPath', { test: 'param' }, 'anotherPath');

            mockURL.addPath.should.have.been.calledTwice;
            mockURL.addPath.firstCall.should.have.been.calledWithExactly('testPath');
            mockURL.addPath.secondCall.should.have.been.calledWithExactly('anotherPath');

            mockURL.addParams.should.have.been.calledOnce;
            mockURL.addParams.should.have.been.calledWithExactly({ test: 'param' });
        });
    });

    describe('mockBase', function() {

        it('should add a mock angular module', function() {

            page.mockModule('myModule', { test: "script" });

            page.browser.addMockModule.should.have.been.calledOnce;
            page.browser.addMockModule.should.have.been.calledWithExactly('myModuleMock', 'angular.module(\'myModuleMock\', []).value(\'myModule\', serialized script);');
        });
    });

    describe('clearMocks', function() {

        it('should clear all mock angular modules', function() {

            page.clearMocks();

            page.browser.clearMockModules.should.have.been.calledOnce;
        });
    });
});