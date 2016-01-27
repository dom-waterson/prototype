(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.service('MocksterService', ['$rootScope', function ($rootScope) {
			var pollingCount = 0;
			var caughtup = false;
			var express = require('express');
			var bodyParser = require('body-parser');
			//var xmlparser = require('express-xml-bodyparser');
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

			//myApp.use(bodyParser.urlencoded({ extended: false }));
			//TODO important!!!!!!!
			myApp.use(bodyParser.text({type: '*/*'}));
			//myApp.use(xmlparser());

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

			myApp.get('/:game/connect', function (req, res) {
				//TODO: sort file handling - need to build/package repsonses
				//TODO: strategy for loading responses - do we really want a json.parse???
				var obj = JSON.parse('{ "guid": "bf00d6b2-0a7b-4b14-b66f-2c507bbc7108" }');
				res.send(obj);
			});

			myApp.get("/:game/disconnect", function (req, res) {
				res.send('{ "disconnected": "true" }');
			});

			myApp.post('/:game/send', function (req, res) {
				//TODO: reqno is coming oup as string.
				if(req.body.match(/command="auth"/g)){
					//caughtup = true;
					var obj1 = JSON.parse('[{\"Number\":2,\"Contents\":\"<admin command=\\\"auth\\\" user=\\\"waterson89\\\" balance=\\\"996977\\\" existingspend=\\\"0\\\" nextgameq=\\\"0\\\" club=\\\"1\\\" nextgameclub=\\\"0\\\" currentgameclub=\\\"0\\\"  ticketprice=\\\"25\\\" pattern=\\\"0111011111101011111110001\\\" patternname=\\\"Space Invader\\\" merged=\\\"false\\\" />\"},{\"Number\":6,\"Contents\":\"<calls command=\\\"catchup\\\" gameno=\\\"981580\\\" gamestage=\\\"1\\\" quantity=\\\"66\\\" pattern=\\\"1010100000101010000010101\\\" patternname=\\\"Grid\\\" promotype=\\\"0\\\" houseprize=\\\"0\\\" jackpot=\\\"50000\\\" jackpotwonon=\\\"42\\\" timeelapsed=\\\"273772.1873\\\"  noplayers=\\\"0\\\" calls=\\\"016557321806636712584226111662445373454315703638286975487460310851023403504168252366597220334707614664711421170513301024225204094035\\\" />\"}]');
					res.send(obj1);
				}
				else if(req.body.match(/command="clubcount"/g)){
					var obj1 = JSON.parse('{\"Number\":2,\"Contents\":\"<admin command=\\\"auth\\\" user=\\\"waterson89\\\" balance=\\\"996977\\\" existingspend=\\\"0\\\" nextgameq=\\\"0\\\" club=\\\"1\\\" nextgameclub=\\\"0\\\" currentgameclub=\\\"0\\\"  ticketprice=\\\"25\\\" pattern=\\\"0111011111101011111110001\\\" patternname=\\\"Space Invader\\\"  />\"}');
					res.send(obj1);
				}
				else if(req.body.match(/command="purchase"/g)){
					var obj1 = JSON.parse('[{\"Number\":8,\"Contents\":\"<admin command=\\\"purchase\\\" success=\\\"true\\\" newbalance=\\\"996967\\\" newexistingspend=\\\"10\\\" quantity=\\\"1\\\" />\"},{\"Number\":9,\"Contents\":\"<cards game=\\\"next\\\" quantity=\\\"1\\\" gameno=\\\"981581\\\"><ticket id=\\\"A\\\" numbers=\\\"08244154750718326065142643486709194256631523345370\\\" /></cards>\"}]');
					res.send(obj1);
				}
				else if(req.query.reqno == 1 && !caughtup) {
					var foo = '{\"Number\":1,\"Contents\":\"<connected />\"}';
					var obj = JSON.parse(foo);
					res.send(obj);
				}
				//else if (caughtup) {
				//	if (pollingCount === 0) {
				//		pollingCount++;
				//		var obj3 = JSON.parse('{\"Number\":7,\"Contents\":\"<calls command=\\\"calls\\\" callno=\\\"67\\\" call=\\\"54\\\" />\"}');
				//		res.send(obj3);
				//	}
				//}
			});

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
