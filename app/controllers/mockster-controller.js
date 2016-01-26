(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.controller('MocksterController', ['$scope', 'MocksterService', function ($scope, mocksterService) {
			$scope.mocksterService = mocksterService;
			mocksterService.start();
		}]);
})();
