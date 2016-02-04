(function () {
    'use strict';
	//TODO: these need to be refactored:



	//TODO: refactor
	var responses2 = {
		"connect":{
			nextMessage: {endpoint: "send", source:"pre-canned", responseIndex:0},
			response: { "guid": "bf00d6b2-0a7b-4b14-b66f-2c507bbc7108" }
		},
		"disconnect": {
			response: [{ "disconnect": "true" }]
		},
		"send" :{
			'purchase': {
				nextMessage: {endpoint: "send", source:"pre-canned", responseIndex:1},
				response: [{"Number":14,"Contents":"<admin command=\"purchase\" success=\"true\" newbalance=\"997687\" newexistingspend=\"50\" quantity=\"1\" />"}]
			},
			"auth": {
				nextMessage: [{endpoint: "send", source:"pre-canned", responseIndex:2},
					{endpoint: "send", source:"pre-canned", responseIndex:3},
					{endpoint: "send", source:"pre-canned", responseIndex:4},
					{endpoint: "send", source:"pre-canned", responseIndex:5}],
				response: [{"Number":2,"Contents":"<admin command=\"auth\" user=\"waterson89\" balance=\"997737\" />"}]
			},
			'*': [{ response: {"Number":10,"Contents":"<calls command=\"Winner\" Quantity=\"0\" totalprizes=\"0\" prizeperbet=\"0\" prizepool=\"0\" totalplayers=\"0\" ></calls>"}},
				{ response: {"Number":11,"Contents":"<calls command=\"SetStage\" newstage=\"0\" />"}},
				{ response: {"Number":12,"Contents":"<info><hamsterset><last8 hams=\"72631418\" /><last100><hamster ham=\"1\" races=\"28\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"2\" races=\"15\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"3\" races=\"9\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"4\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"5\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"6\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"7\" races=\"6\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"8\" races=\"6\" staked=\"0\" won=\"0\" percentage=\"0\"/></last100></hamsterset></info>"}},
				{ response: {"Number":15,"Contents":"<cards game=\"next\" gameno=\"2206035\" hamster=\"1\" price=\"50\" betstring=\"10000000000000000000000000000000\" existingamount=\"50\" />"}},
				{ response: {"Number":22,"Contents":"<calls command=\"reset\" gameno=\"2206035\" noplayers=\"1\" hamsterset=\"2\" gametype=\"1\" full=\"514631537322316853874455461378623737351422586872516615154338341652484687314238468418275614482518343837522886184515432637848387357248671128831264334466335725457326573742677154164151882522676112251525723434664435124634621331881381311842526474343717163742341234242868763857747172531225637244676674625568642628633844833125414471234478468437881114511715575648858622711657341153743621362511574814\" />"}},
				{ response: {"Number":28,"Contents":"<calls command=\"Winner\" Quantity=\"0\" totalprizes=\"0\" prizeperbet=\"0\" prizepool=\"0\" totalplayers=\"1\" ></calls>"}},
				{ response: {"Number":29,"Contents":"<calls command=\"SetStage\" newstage=\"0\" />"}},
				{ response: {"Number":30,"Contents":"<info><hamsterset><last8 hams=\"47263141\" /><last100><hamster ham=\"1\" races=\"28\" staked=\"50\" won=\"0\" percentage=\"0\"/><hamster ham=\"2\" races=\"15\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"3\" races=\"8\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"4\" races=\"13\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"5\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"6\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"7\" races=\"6\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"8\" races=\"6\" staked=\"0\" won=\"0\" percentage=\"0\"/></last100></hamsterset></info>"}}]
		},
		"pre-canned": [
			{response: {"Number":1,"Contents":"<connected />"}},
			{response: [{"Number":15,"Contents":"<cards game=\"next\" gameno=\"2206035\" hamster=\"1\" price=\"50\" betstring=\"10000000000000000000000000000000\" existingamount=\"50\" />"}]},
			{response: {"Number":4,"Contents":"<cards game=\"next\" gameno=\"2206035\" hamster=\"0\" price=\"0\" betstring=\"00000000000000000000000000000000\" existingamount=\"0\" />"}},
			{response: {"Number":5,"Contents":"<cards game=\"curr\" gameno=\"2206034\" hamster=\"0\" price=\"0\" betstring=\"00000000000000000000000000000000\" existingamount=\"0\" />"}},
			{response: {"Number":6,"Contents":"<calls command=\"catchup\" gameno=\"2206034\" gamestage=\"1\" quantity=\"2\" houseprize=\"0\" timeelapsed=\"26219.9085\" hamsterset=\"2\"  gametype=\"1\"  promotype=\"0\"  noplayers=\"0\" calls=\"237177175247612867475214424123767785535876358813383314627827434751472221252172436873272864273318525871662523515287287725441128527612841654634617153712815647478162452168534552244654434581544867544133586611713638354623424234273342226677776718382167567212814238436663835666777435475376735858667587412513441583625245765463436355785164168236716178881452138176278438631782867823632177248376555232352634417831816853118147364284287\" stepstaken=\"260\" />"}},
			{response: {"Number":7,"Contents":"<info><hamsterset><last8 hams=\"26314186\" /><last100><hamster ham=\"1\" races=\"28\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"2\" races=\"15\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"3\" races=\"9\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"4\" races=\"13\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"5\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"6\" races=\"12\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"7\" races=\"5\" staked=\"0\" won=\"0\" percentage=\"0\"/><hamster ham=\"8\" races=\"6\" staked=\"0\" won=\"0\" percentage=\"0\"/></last100></hamsterset></info>"}}
		]
	};

	//TODO: figure out verbs, actual endpoints etc?
	var config = {
			gameName:[
				'hamsters',
				'bingo50',
				'bingo60',
				'bingo75',
				'bingo80',
				'bingo90',
				'bingoLite',
				'pulse'
			],
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
		.service('MocksterService', ['$rootScope', '$interval', function ($rootScope, $interval) {
			var express = require('express');
			var bodyParser = require('body-parser');
			var myApp = express();
			var fs = require('fs');
			var me = this;
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

			//TODO: long polling queue object
			var longPollingQueue = new LongPollingQueue();

			var queueUpNextMessage = function(nextMessageDefinition){
				longPollingQueue.enqueue(responses2[nextMessageDefinition.source][nextMessageDefinition.responseIndex].response);
			};

			var queueUpNextResponses = function(nextMessageDefinition){
				var i;
				if(!nextMessageDefinition){
					return;
				}
				if(nextMessageDefinition.constructor === Array){
					for(i=0; i < nextMessageDefinition.length; i++){
						queueUpNextMessage(nextMessageDefinition[i]);
					}
				}
				else {
					queueUpNextMessage(nextMessageDefinition);
				}
			};

			var respond = function (res, responseDefinition){
				queueUpNextResponses(responseDefinition.nextMessage);
				res.send(responseDefinition.response);
			};

			var handleStandardRequest = function(req, res, endpointDefinition){
				respond(res, responses2[endpointDefinition.name]);
			};

			var handleLongPollRequest = function (req, res, endpointDefinition) {
				//TODO: handle endpoint assumes only one long poll queue - need to create queue per long polled endpoint
				if(req.body.match(/none/)){
					if(longPollingQueue.queue.length > 0){
						res.send(longPollingQueue.queue);
						longPollingQueue.reset();
					}
				}

				//TODO: Better & generic way to tie command to message
				if(req.body.match(/command="auth"/g)){
					respond(res, responses2[endpointDefinition.name]["auth"])
				}
				else if (req.body.match(/command="clubcount"/g)){
					res.send();
				}
				else if (req.body.match(/command="purchase"/g)) {
					respond(res, responses2[endpointDefinition.name]["purchase"]);
				}
			};

			me.startTimeLineResponses = function () {
				var i = 0;
				$interval(function() {
					console.log("polling");
					longPollingQueue.queue(responses2['send']['*'][i]);
					i++;
				},2000, responses.length);

				$interval(function() {
					console.log("nextgame");
					longPollingQueue.queue(nextGames[i]);
					i++;
				},5000, 5);
			};

			var nextGames = [
				{"Number":8,"Contents":"<admin command=\"nextgame\" time=\"50\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"},
				{"Number":8,"Contents":"<admin command=\"nextgame\" time=\"40\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"},
				{"Number":8,"Contents":"<admin command=\"nextgame\" time=\"30\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"},
				{"Number":8,"Contents":"<admin command=\"nextgame\" time=\"20\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"},
				{"Number":8,"Contents":"<admin command=\"nextgame\" time=\"10\" gameno=\"2206035\" hamsterset=\"2\" gametype=\"1\" promotype=\"0\" />"}
			];

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

		}]);
})();
