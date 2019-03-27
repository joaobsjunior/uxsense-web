UXSenseWebManager.factory('httpInterceptionService', ["$rootScope", function($rootScope) {
	var callback = function(response) {
		if (response.config.complete) {
			response.config.complete(response);
		}
		return response;
	};
	var service = {
		'request': function(config) {
			if (config.beforeSend) {
				config.beforeSend()
			}
			return config;
		},
		'requestError': function(config) {
			if (config.beforeSend) {
				config.beforeSend()
			}
			return config;
		},
		'response': callback,
		'responseError': callback
	}
	return service;
}]);
