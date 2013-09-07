var Serializer = require('../lib/astrolabe/utils/serializer');

describe('Serializer', function() {

    describe('serialize', function() {

        var scenarios = [
            { it: 'should serialize object to string',   object: {},               expectedString: '{}' },
            { it: 'should serialize object to string',   object: { prop: 'prop' }, expectedString: '{prop: "prop"}' },
            { it: 'should serialize object to string',   object: { prop: 'prop', func: function() {} }, expectedString: '{prop: "prop", func: function () {}}' },

            { it: 'should serialize function to string', object: function() {}, expectedString: 'function () {}' }
        ];

        scenarios.forEach(function(scenario) {

            it(scenario.it, function() {

                var serializer = new Serializer();

                expect(serializer.serialize(scenario.object)).to.equal(scenario.expectedString);
            });
        });

    });
});