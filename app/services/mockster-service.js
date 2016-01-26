(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.service('MocksterService', ['$rootScope', function ($rootScope) {
			var express = require('express');
			var bodyParser = require('body-parser');
			var myApp = express();
			var fs = require('fs');
			var me = this;
			me.port = '';
			me.requests = [];



			myApp.use(function(req, res, next) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Credentials', true);
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-Type');
				next();
			});

			myApp.use(bodyParser.urlencoded({ extended: false }));

			myApp.use(function(req,res, next){
				var actualEnd = res.end;
				console.log(req);
				console.log(req.body);



				res.end = function(chunk){
					var chunks = [];
					if (chunk)
						chunks.push(chunk);

					var responseBody = Buffer.concat(chunks).toString('utf8');
					console.log(res);
					console.log(responseBody);
					me.requests.push({request:{
						method:req.method,
						originalUrl: req.originalUrl,
						body: JSON.stringify(req.body)},
						response:{
							statusCode:res.statusCode,
							statusMessage:res.statusMessage,
							body:responseBody}
					});
					actualEnd.apply(res, arguments);
				}
				next();

				$rootScope.$apply();
			});

			myApp.get('/', function (req, res) {
				console.log("Got a GET request for the homepage");
				res.send('Hello GET');
			});

			//TODO localhost:8081/bingo75/connect?server=dev-bingo75.tombola.co.uk:12353&bust=1453471957877
			myApp.get('/:game/connect', function (req, res) {
				//TODO: sort file handling - need to build/package repsonses
				//TODO: strategy for loading responses - do we really want a json.parse???
				//obj = fs.readFileSync('/games/bingo75/connect.json', 'utf8');
				console.log('Connect');
				var obj = JSON.parse('{ "guid": "bf00d6b2-0a7b-4b14-b66f-2c507bbc7108" }');
				res.send(obj);
			});

			myApp.get("/:game/disconnect", function (req, res) {
				console.log('Disconnect');
				res.send(true);
			});

			myApp.post('/:game/send', function (req, res) {
				console.log(req.body);
				//TODO: reqno is coming oup as string.
				if(req.query.reqno == 1){
					var foo = '{\"Number\":1,\"Contents\":\"<connected />\"}';
					var obj = JSON.parse(foo);
					console.log("Is one 1");
					res.send(obj);
				} else {
					console.log("Not 1");
					var obj1 = JSON.parse('{\"Number\":2,\"Contents\":\"<admin command=\\\"auth\\\" user=\\\"waterson89\\\" balance=\\\"996977\\\" existingspend=\\\"0\\\" nextgameq=\\\"0\\\" club=\\\"1\\\" nextgameclub=\\\"0\\\" currentgameclub=\\\"0\\\"  ticketprice=\\\"25\\\" pattern=\\\"0111011111101011111110001\\\" patternname=\\\"Space Invader\\\"  />\"}');
					res.send(obj1);
				}
			});


			//TODO http://{proxy-url}/disconnect?id={guid}... responses with A Boolean value - true is disconnected, false if not.
			//myApp.get('/:game/disconnect/:', function (req, res) {
			//	var obj;
			//	obj = fs.readFileSync(__dirname + "/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
			//	obj = JSON.parse(obj);
			//	res.send(obj.connect);
			//});


			// POSTS auth http://{proxy-url}/send?id={guid}&message={messageNumber}&reqno={requestNumber} <Admin Command="auth" ClubNo="{clubNumber}" siteid="{siteID}" id="{id}" clienttypeid="{clientTypeID}" CrossCheck="{crossCheck}"/>


			// purchase http://{proxy-url}/send?id={guid}&message={messageNumber}&reqno={requestNumber}  <Admin Command="purchase" existingamount="{existingAmount}" gameno="{gameNumber}" id="{id}" amount="{amount}" quantity="{quantity}" pattern="{pattern}"/>



			//myApp.get('/connect/:game', function (req, res) {
			//	var obj;
			//	obj = fs.readFileSync("/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
			//	obj = JSON.parse(obj);
			//	res.send(obj.connect);
			//});
            //
			//myApp.post('/send/:game/auth', function (req, res) {
			//	var obj;
			//	obj = fs.readFileSync("/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
			//	obj = JSON.parse(obj);
			//	res.send(obj.auth);
			//});
            //
			//myApp.post('/send/:game/purchase', function (req, res) {
			//	var obj;
			//	obj = fs.readFileSync("/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
			//	obj = JSON.parse(obj);
			//	res.send(obj.purchase);
			//});
            //
			//myApp.post('/send/:game/:number', function (req, res) {
			//	var obj;
			//	obj = fs.readFileSync("/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
			//	obj = JSON.parse(obj);
			//	res.send(obj.calls[req.params.number - 1]);
			//});

			me.start = function(){
				var server = myApp.listen(8081, function () {
					me.port = server.address().port;
					console.log("Example app listening at http://localhost:%s", me.port);
					$rootScope.$apply();
				});
			};

			me.clearRequests = function(){
				me.requests.length = 0;
			}

		}]);
})();
