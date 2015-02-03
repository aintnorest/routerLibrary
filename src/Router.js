/* */
var postal = require('postal');

var routeMap = {};

function Router(level){
	var lvl = (level) ? level : 0;
	var r = {};
	/* If level doesn't exist add the listener and initialize an object at that level */
	if(!routeMap[lvl]){
		routeMap[lvl] = {};
		var topic = "page." + lvl +".change";
		routeMap[lvl].rmLstSub = addListener(topic, function(url){ openRoute(url,lvl) });
	}
	/* Return obj w/ method that takes a url[string],callback[function],guard[function] guard must return true or false*/
	r.addRoute = function(url, callback, guard){
		if(typeof callback !== "function") console.log("Callback for Route is not a function !!!");
		if(typeof guard !== "function") console.log("Callback for Route is not a function !!!");
		if(!routeMap[lvl][url]) routeMap[lvl][url] = { c: callback, g:guard };
	}
	return r;
}

function addListener(t,c){
	return postal.subscribe({ channel: "Router", topic: t, callback: c, });
}

function openRoute(url,lvl){
	"use strict";
	if(routeMap[lvl][url] !== undefined){
		if(routeMap[lvl][url].g()) routeMap[lvl][url].c();
	}

}

function iterateURL(url, pu){
	"use strict";
	var u = url.split("/");
	var len = u.length;
	for(var i = 0; i < len; i++){
		if(pu[i] !== u[i]){
			var c = 0;
			for(var j = i; j < len; j++){
				setTimeout(iterate(u,j),c * 15);
				c++;
			}
			return u;
		}
	}
	return u;
}

function iterate(u, i){
	"use strict";
	return function(){
		postal.publish({
			channel: "Router",
			topic: "page." + i + ".change",
			data: u[i]
		});
	};

}
//
if(!window) var window = {};
var initialized = false;
//
function Init(){
	if(initialized) return;
	else {
		var pvrUrl = [];
		//
		window.onpopstate = function(){
			prvUrl = iterateURL(document.location.hash,prvUrl);
		};
		var su = addListener("setUrl", function(url) {
			history.pushState({}, "", url);
			prvUrl = iterateURL(url,prvUrl);
		});
		var sou = addListener("setOldUrl", function(url){
			prvUrl = (url.isArray) ? url : [];
		});
		initialized = true;
	}
}
//
//
module.exports.Router = Router;
module.exports.Init = Init;
