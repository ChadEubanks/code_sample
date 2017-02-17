alto_require('core-os/core.js');

TestRunner.lwFrameworkStatechartTest = Alto.TestModule.createWithMixins({

    moduleName: 'lw framework statechart test',

    setup: function () {
        // create a fake application namespace
        TestNamespace = CoreOs.Application.create({
            NAMESPACE: 'TestNamespace',

            testArg: null,

            testArg2: null

        });

        TestNamespace.View = CoreOs.View.extend(),

            // create a fake statechart
            TestNamespace.statechart = CoreOs.Statechart.create();
        // cretae a fake state that has no substates
        TestNamespace.MainState = CoreOs.State.extend({
            goToAltState: function () {
                TestNamespace.statechart.goToState('altState');
            }
        });
        // cretae a fake state that has substates
        TestNamespace.AltState = CoreOs.State.extend({

            viewState: Alto.Object.create({
                displayTestView: function (arg, arg2) {
                    TestNamespace.testView = CoreOs.View.create({
                        instanceName: 'TestNamespace.testView',
                        attachToNode: 'body',
                        testArg: arg,
                        testArg2: arg2
                    })
                },

                removeTestView: function () {
                    TestNamespace.testView.remove();
                }
            }),

            enterState: function () {
            },

            transitionToSubstateFoo: function () {
                TestNamespace.statechart.goToSubstate('fooSubstate');
            },

            transitionToSubstateBar: function () {
                TestNamespace.statechart.goToSubstate('barSubstate');
            },

            fooSubstate: CoreOs.Substate.extend(),
            barSubstate: CoreOs.Substate.extend({
                transitionToSubstateFooFromSubstateBar: function () {
                    TestNamespace.statechart.goToSubstate('fooSubstate');
                }
            }),

            methodWithArgument: function (arg, arg2) {
                TestNamespace.set('testArg', arg);
                TestNamespace.set('testArg2', arg2);
            },

            exitState: function () {
            }

        });
    },

    testStatechartInstance: function () {
        var expected = 'Instance',
            result = TestNamespace.statechart;
        Alto.test.type(expected, result, "TestNamespace.statechart should be an %@".fmt(expected));

        var expression = TestNamespace.statechart.get('currentState');
        Alto.test.empty(expression, "TestNamespace.statechart should not have a currentState ");

        expression = TestNamespace.statechart.get('currentSubstate');
        Alto.test.empty(expression, "TestNamespace.statechart should not have a currentSubstate ");
    },

    testStatechartGoToState: function () {
        TestNamespace.statechart.goToState('mainState');

        var expected = 'mainState',
            result = TestNamespace.statechart.get('currentState');
        Alto.test.equals(expected, result, "TestNamespace.statechart currentState should equal %@".fmt(expected));

        expected = 'Instance';
        result = TestNamespace.mainState;
        Alto.test.type(expected, result, "TestNamespace.mainState should be an %@".fmt(expected));

        TestNamespace.statechart.dispatchEvent('goToAltState');

        expected = 'altState';
        result = TestNamespace.statechart.get('currentState');
        Alto.test.equals(expected, result, "TestNamespace.statechart currentState should equal %@".fmt(expected));

        expected = 'Instance';
        result = TestNamespace.altState;
        Alto.test.type(expected, result, "TestNamespace.altState should be an %@".fmt(expected));
    },

    testStatehcartGoToSubstate: function () {
        TestNamespace.statechart.dispatchEvent('transitionToSubstateFoo');

        var expected = 'fooSubstate',
            result = TestNamespace.statechart.get('currentSubstate');
        Alto.test.equals(expected, result, "TestNamespace.statechart currentState should equal %@".fmt(expected));

        expected = 'Instance';
        result = TestNamespace.fooSubstate;
        Alto.test.type(expected, result, "TestNamespace.fooSubstate should be an %@".fmt(expected));

        TestNamespace.statechart.dispatchEvent('transitionToSubstateBar');
        expected = 'barSubstate';
        result = TestNamespace.statechart.get('currentSubstate');
        Alto.test.equals(expected, result, "TestNamespace.statechart currentState should equal %@".fmt(expected));

        expected = 'Instance';
        result = TestNamespace.barSubstate;
        Alto.test.type(expected, result, "TestNamespace.barSubstate should be an %@".fmt(expected));

        //todo should we destory state / substate instances after exiting them?
        //var expression = TestNamespace.fooSubstate;
        //Alto.test.uninstantiatedObject(expression, 'TestNamespace.fooSubstate instance should be destroyed.');

        TestNamespace.statechart.dispatchEvent('transitionToSubstateFooFromSubstateBar');
        expected = 'fooSubstate';
        result = TestNamespace.statechart.get('currentSubstate');
        Alto.test.equals(expected, result, "Transition from substate to another subatete.  TestNamespace.statechart currentState should equal %@".fmt(expected));
    },

    testDispatchEventWithArgument: function () {
        TestNamespace.statechart.dispatchEvent('methodWithArgument', 'this is a value from arg', 'this is a value from arg2');

        var expected = 'this is a value from arg',
            result = TestNamespace.get('testArg');

        Alto.test.equals(expected, result, "TestNamespace.testArg should equal %@".fmt(expected));

        expected = 'this is a value from arg2';
        result = TestNamespace.get('testArg2');

        Alto.test.equals(expected, result, "TestNamespace.testArg2 should equal %@".fmt(expected));
    },

    testDispatchViewEvent: function () {
        TestNamespace.statechart.dispatchViewEvent('displayTestView', 'this is a value from arg', 'this is a value from arg2');

        var expected = 'Instance',
            result = TestNamespace.testView;

        Alto.test.type(expected, result, "TestNamespace.fooSubstate should be an %@".fmt(expected));

        expected = 'this is a value from arg';
        result = TestNamespace.testView.get('testArg');

        Alto.test.equals(expected, result, "TestNamespace.testView.testArg should equal %@".fmt(expected));

        expected = 'this is a value from arg2';
        result = TestNamespace.testView.get('testArg2');

        Alto.test.equals(expected, result, "TestNamespace.testView.testArg2 should equal %@".fmt(expected));

        TestNamespace.statechart.dispatchViewEvent('removeTestView');
        var expression = TestNamespace.testView;
        Alto.test.uninstantiatedObject(expression, 'TestNamespace.testView instance should be destroyed.');
    },

    teardown: function () {
        delete window.TestNamespace;
    }

});