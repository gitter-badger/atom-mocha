import { combineReducers } from 'redux';
import {Actions} from "./actions";

function identity(defaultValue){
    return function(x){
        return x || defaultValue;
    };
}

function toggleSuite(suites, id){
    const suite = {...suites[id]};
    suite.toggleState = suite.toggleState === "collapsed" ? "expaned" : "collapsed";
    const result = { ...suites };
    result[id] = suite;
    return result;
}

function suites(suites = {}, action){
    if(action.type === Actions.TOGGLE_SUITE){
        return toggleSuite(suites, action.suite);
    }

    return suites;
}

function updateTestStatus(tests, id, status){
    const test = {...tests[id]};
    test.status = status;
    const result = { ...tests }
    result[id] = test;
    return result;
}

function tests(tests = {}, action){
    if(action.type === Actions.BEGIN_TEST){
        const {id} = action.test;
        return updateTestStatus(tests, id, "pending");
    }
    if(action.type === Actions.END_TEST){
        const {id, state} = action.test;
        return updateTestStatus(tests, id, state);
    }
    return tests;
}

const suitesAndTests = combineReducers( { suites, tests} );
const entitiesAndResult = combineReducers({
    entities : suitesAndTests,
    result : identity([])
});

const initialState = {
    entities : {
        suites : {},
        tests : {}
    },
    result : []
};
export default function(state = initialState, action){
    if(action.type === Actions.RESTART){
        return initialState;
    }
    if(action.type === Actions.BEGIN){
        const {result, entities} = action.data;
        return {
            entities : {
                suites : { ...entities.suites},
                tests : {...entities.tests}
            },
            result : [...result]
        };
    }
    if(action.type === Actions.END){
        return state;
    }
    return entitiesAndResult(state, action);
};
