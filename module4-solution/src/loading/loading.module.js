(function(){
	'use strict';
	angular.module('Loading',[])
	.config(config);

	config.$inject=['$httpProvider'];
	function config($httpProvider){
		$httpProvider.interceptors.push('loadingHttpInterceptor');	
	}


})();
