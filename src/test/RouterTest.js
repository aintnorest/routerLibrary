var Router = require('../Router');
var postal = require('postal');
var assert = require("assert"); // core module

describe('Router', function(){
  
	describe('Module Router', function(){
	    it('should be an object', function(){
		    assert.equal(typeof Router, 'object');
	    });
	    it('should have a method Init', function(){
		    assert.equal(typeof Router.Init, 'function');
	    });
	    it('should have a method Router', function(){
		    assert.equal(typeof Router.Router, 'function');
	    });
	});

	describe("Method Router", function(){
		var r = Router.Router();
		it("Should return an Object", function(){
			assert.equal(typeof r, 'object');
		});
		it("Should have a method called addRoute", function(){
			assert.equal(typeof r.addRoute, 'function');
		});
	});

	describe("Init Testing", function(){
		Router.Init();
		Router.Init();
		it("Firing Init Twice Shoudln't Init Twice", function(){
			var results = postal.getSubscribersFor({
			  	channel:"Router",
			  	topic: "setUrl"
			});
			assert.equal(results.length, 1);
		});

	});

});  