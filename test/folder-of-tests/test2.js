
function aFailedSuite(){
    describe("All failes", ()=>{
        it("fail", ()=>{
            throw new Error("The test has failed");
        });
        it("fail", ()=>{
            throw new Error("The test has failed");
        });
    });
}
function aPassedSuite(){
    describe("All Pass", ()=>{
        it("pass", ()=>{
        });
        it("pass", ()=>{
        });
    });
}

function aPartialSuite(){
    describe("Partial Pass", ()=>{
        it("fail", ()=>{
            throw new Error("The test has failed");
        });
        it("pass", ()=>{
        });
    });
}

function aMixedSuite(name, ...suites){
    describe(name, ()=>{
        suites.forEach((suite)=>{ suite(); });
    })
}

aFailedSuite();
aPassedSuite();
aPartialSuite();
aMixedSuite("A Mix", aPassedSuite, aFailedSuite);
aMixedSuite("All Pass", aPassedSuite, aPassedSuite);
aMixedSuite("All Failed", aFailedSuite, aFailedSuite);
aMixedSuite("A pass, a fail and a partial", aPassedSuite, aFailedSuite, aPartialSuite);
