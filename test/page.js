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
            By:  {
                id: sinon.stub(),
                css: sinon.stub(),
                xpath: sinon.stub(),
                name: sinon.stub(),
                tagName: sinon.stub(),
                className: sinon.stub(),
                linkText: sinon.stub(),
                partialLinkText: sinon.stub(),
                js: sinon.stub(),
                binding: sinon.stub(),
                select: sinon.stub(),
                selectedOption: sinon.stub(),
                input: sinon.stub(), 
                model: sinon.stub(),
                textarea: sinon.stub(),
                repeater: sinon.stub(),
                buttonText: sinon.stub(),
                partialButtonText: sinon.stub(),
            },
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

    it('should find by id', function () {
        this.page.find.by.id('id');
        this.page.by.id.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.id.should.have.been.calledWithExactly('id');
    });

    it('should find by css', function () {
        this.page.find.by.css('css');
        this.page.by.css.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.css.should.have.been.calledWithExactly('css');
    });

    it('should find by xpath', function () {
        this.page.find.by.xpath('xpath');
        this.page.by.xpath.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.xpath.should.have.been.calledWithExactly('xpath');
    });

    it('should find by className', function () {
        this.page.find.by.className('className');
        this.page.by.className.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.className.should.have.been.calledWithExactly('className');
    });

    it('should find by linkText', function () {
        this.page.find.by.linkText('linkText');
        this.page.by.linkText.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.linkText.should.have.been.calledWithExactly('linkText');
    });

    it('should find by partialLinkText', function () {
        this.page.find.by.partialLinkText('partialLinkText');
        this.page.by.partialLinkText.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.partialLinkText.should.have.been.calledWithExactly('partialLinkText');
    });

    it('should find js', function () {
        this.page.find.by.js('js');
        this.page.by.js.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.js.should.have.been.calledWithExactly('js');
    });

    it('should find by binding', function () {
        this.page.find.by.binding('binding');
        this.page.by.binding.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.binding.should.have.been.calledWithExactly('binding');
    });

    it('should find select', function () {
        this.page.find.by.select('select');
        this.page.by.select.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.select.should.have.been.calledWithExactly('select');
    });

    it('should find selectedOption', function () {
        this.page.find.by.selectedOption('selectedOption');
        this.page.by.selectedOption.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.selectedOption.should.have.been.calledWithExactly('selectedOption');
    });

    it('should find by input', function () {
        this.page.find.by.input('input');
        this.page.by.input.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.input.should.have.been.calledWithExactly('input');
    });

    it('should find by model', function () {
        this.page.find.by.model('model');
        this.page.by.model.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.model.should.have.been.calledWithExactly('model');
    });

    it('should find by textarea', function () {
        this.page.find.by.textarea('textarea');
        this.page.by.textarea.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.textarea.should.have.been.calledWithExactly('textarea');
    });

    it('should find by repeater', function () {
        this.page.find.by.repeater('repeater');
        this.page.by.repeater.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.repeater.should.have.been.calledWithExactly('repeater');
    });

    it('should find by buttonText', function () {
        this.page.find.by.buttonText('buttonText');
        this.page.by.buttonText.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.buttonText.should.have.been.calledWithExactly('buttonText');
    });

    it('should find by partialButtonText', function () {
        this.page.find.by.partialButtonText('partialButtonText');
        this.page.by.partialButtonText.should.have.been.calledOnce;
        this.page.driver.findElement.should.have.been.calledOnce;
        this.page.by.partialButtonText.should.have.been.calledWithExactly('partialButtonText');
    });

    it('should find all by css', function () {
        this.page.find.all.by.css('findAllByCss');
        this.page.by.css.should.have.been.calledOnce;
        this.page.driver.findElements.should.have.been.calledOnce;
        this.page.by.css.should.have.been.calledWithExactly('findAllByCss');
    });

    describe('exceptions', function() {
        it('should thro an exception', function() {

            var exception = this.page.exception('CustomException');
            expect(exception.thro).to.throw(exception);

        });
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

    describe('mockBackend', function() {

        it('should add a mock angular module with run config', function() {

            this.page.mockBackend(function() { return "test"; });

            this.page.driver.addMockModule.should.have.been.calledOnce;
            this.page.driver.addMockModule.should.have.been.calledWithExactly('httpBackendMock', 'angular.module(\'httpBackendMock\', [\'ngMockE2E\']).run(serialized script);');
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
