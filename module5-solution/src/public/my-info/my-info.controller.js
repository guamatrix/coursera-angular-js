(function(){

	'use strict';
	angular.module('public')
	.controller('MyInfoController',MyInfoController);

	MyInfoController.$inject=['MenuService','ApiPath'];
	function MyInfoController(MenuService,ApiPath){
		var ctrl=this;

		ctrl.base=ApiPath
		ctrl.myInfo=MenuService.getInfo();
		if (ctrl.myInfo.info===undefined){
			ctrl.existInfo=false;
			console.log('vacio');
		}else{
			ctrl.existInfo=true;
			console.log('data');
		}
	}
})();
