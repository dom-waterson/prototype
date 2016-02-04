//(function () {
//    'use strict';
//    angular.module()
//		.factory('ProxyFactory', function () {
//			var express = require('express');
//			var bodyParser = require('body-parser');
//			var myApp = express();
//			var fs = require('fs');
//
//			myApp.use(function(req, res, next) {
//				res.header('Access-Control-Allow-Origin', '*');
//				res.header('Access-Control-Allow-Credentials', true);
//				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//				res.header('Access-Control-Allow-Headers', 'Content-Type');
//				next();
//			});
//			myApp.use(bodyParser.text({type: '*/*'}));
//		});
//})();
