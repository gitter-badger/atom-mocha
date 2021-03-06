import Mocha from "mocha";
import processor from "../utils/processor";
import makeSuite from "../utils/make-suites";
import {begin, done, endSuite, startTest, finishTest, restart, handleError} from "../actions";
import process from "child_process";
import AbstractRuntime from "../AbstractRuntime";
import path from "path";

export default class MochaRuntime extends AbstractRuntime{
    constructor(store, compiler){
        super();
        this.store = store;
        this.compiler = compiler;
    }
    start(){
        const {store, files} =  this;
        const mochaPath = path.join(__dirname, 'mocha-process.js');
        const mocha =  process.fork(mochaPath, [this.compiler].concat(this.files), {
            slient : true
        }, {
            error : function(err){
                console.trace(err);
            }
        });
        restart(store);
        mocha.on("uncaughtException", function(){
            console.log('error');
        });
        mocha.on("message", function(action){
            switch(action.message){
                case "BEGIN" :
                    return begin(store, { data : processor([makeSuite(action.data)])} );
                case "END" :
                    return done(store, { data : action.data });
                case "START_TEST":
                    return startTest(store, { test : action.data });
                case "END_TEST":
                    return finishTest(store, { test : action.data });
                case "SUITE_END" :
                    return endSuite(store, { suite : action.data });
                case "ERROR" :
                    return handleError(store, { error : action.error });
            }
        });
    }
    clearFiles(){
        this.files = [];
    }
    addFile(filePath){
        this.files.push(filePath);
    }
}
