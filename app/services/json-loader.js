(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.service('JsonLoader', function () {
			var fs = require('fs');
			var me = this;
			me.bingo75Files = [];
			me.bingo90Files = [];

			for(i=0; i<numberOfFiles; i++) {
				//Loop through number of games by getting number of directories in server directory
				//Read number of json files in specific game (i)
				//Loop through number of json files in specific game (i)
				//Push to array for specific game.
				var file = fs.readFileSync;
				me.files.push(file);
			}
		});
})();
