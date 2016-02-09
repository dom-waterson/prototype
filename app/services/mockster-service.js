(function () {
    'use strict';
	//TODO: figure out verbs, actual endpoints etc?
	var config = {
			gameName:'hamsters',
			endPoints: [
				{ method:"get", name:"connect"},
				{ method:"get", name:"disconnect"},
				{ method:"post", name:"send", longPoll:true}
			]
	};

	var LongPollingQueue = function(){
		var me = this;
		me.queue = [];

		me.enqueue =  function(response){
			me.queue.push(response);
		};

		me.reset = function(){
			me.queue = [];
		}
	};

    angular.module('Tombola.Mockster')
		.service('MocksterService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
			var express = require('express');
			var bodyParser = require('body-parser');
			var hamsters = require('games/pulse.json');
			var myApp = express();
			var fs = require('fs');
			var me = this;
			var timelineIndex = 0;
			me.port = '';
			me.serverRunning = false;
			me.startTimeline = false;

			var setHeaders = function(req, res, next) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Credentials', true);
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-Type');
				next();
			};

			var createEndpointPath = function(endpointName){
				return 	'/' + config.gameName + '/' + endpointName;
			};

			var initializeEndpoint = function (endpointDefinition){
				myApp[endpointDefinition.method](createEndpointPath(endpointDefinition.name), function (req, res) {
					endpointDefinition.longPoll ? handleLongPollRequest(req, res, endpointDefinition) : handleStandardRequest(req, res, endpointDefinition);
				});
			};

			me.initializeServer = function () {
				var i;
				for (i=0; i< config.endPoints.length; i++) {
					initializeEndpoint(config.endPoints[i]);
				}
				me.start();
			};

			myApp.use(setHeaders);
			myApp.use(bodyParser.text({type: '*/*'}));

			var longPollingQueue = new LongPollingQueue();

			var queueUpNextMessage = function(nextResponse){
				longPollingQueue.enqueue(nextResponse);
			};

			var queueUpNextResponses = function(nextResponse){
				if(!nextResponse){
					return;
				}
				if(nextResponse.constructor === Array){
					var i;
					for(i=0; i < nextResponse.length; i++){
						queueUpNextMessage(nextResponse[i]);
					}
				}
				else {
					queueUpNextMessage(nextResponse);
				}
			};

			var respond = function (res, responseDefinition){
				queueUpNextResponses(responseDefinition.nextResponse);
				res.send(responseDefinition.response);
			};

			var handleStandardRequest = function(req, res, endpointDefinition){
				respond(res, hamsters[endpointDefinition.name]);
			};

			var handleLongPollRequest = function (req, res, endpointDefinition) {
				//TODO: handle endpoint assumes only one long poll queue - need to create queue per long polled endpoint
				if(req.body.match(/none/)){
					if(longPollingQueue.queue.length > 0){
						res.send(longPollingQueue.queue);
						longPollingQueue.reset();
					} else {
						$timeout(function () {
							res.send(hamsters.send['timeline'][timelineIndex].response);
							timelineIndex++;
						},hamsters.send['timeline'][timelineIndex].delayTime);
					}
				}

				//TODO: Better & generic way to tie command to message
				if(req.body.match(/command="auth"/g)){
					respond(res, hamsters[endpointDefinition.name]["auth"]);
				}
				else if (req.body.match(/command="clubcount"/g)){
				//	res.send({"Number":10,"Contents":"<admin command=\"nextgame\" time=\"30\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"});
					respond(res, hamsters[endpointDefinition.name]["club"]);
				}
				else if (req.body.match(/command="purchase"/g)) {
					respond(res, hamsters[endpointDefinition.name]["purchase"]);
				}
			};

			me.start = function(){
				var server = myApp.listen(8081, function () {
					me.port = server.address().port;
					me.serverRunning = true;
					console.log("Example app listening at http://localhost:%s", me.port);
					$rootScope.$apply();
				});
			};

			me.stopServer = function () {
				me.serverRunning = false;
				myApp.close();
			};

			me.restTimeline = function () {
				timelineIndex = 0;
			};

		}]);
})();
