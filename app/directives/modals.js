angular.module('theApp').directive('modals', function() {
	return {
		restrict: 'E',
        replace: true,
        templateUrl: "directives/modals.html"
	};
});