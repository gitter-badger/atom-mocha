describe("A test", function(){
    it("should pass", function(){
    });

    it("should fail", function(){
        throw new Error();
    });
    describe("with nested stuff", function(){
        it("passes", function(){

        });
        it("fails", function(){
        });
        it("is async", function(done){
            setTimeout(function(){
                done();
            }, 1000);
        });
        it("is async (pass)", function(done){
            setTimeout(function(){
                done();
            }, 1000);
        })
    })
});
