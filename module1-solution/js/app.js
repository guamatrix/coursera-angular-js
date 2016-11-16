(function(){
	'use strict';

	angular.module('LunchCheck',[])
	.controller('LunchCheckController',LunchCheckController);

	LunchCheckController.$inject=['$scope'];
	function LunchCheckController($scope){
		

		$scope.CheckMenu = function(){
			
			$scope.menssage= mensaje($scope.menu);
		};
		

		function NumItem(array){
			
			return array.length;
		};

		function StyleCss(style){
			if(style==1){
				$scope.mensaggeCss={'text-success':false,
									'text-danger':true};
				$scope.menuCss={'nook':true,
								'ok':false};									
			}else{
				$scope.mensaggeCss={'text-success':true,
									'text-danger':false};
				$scope.menuCss={'nook':false,
								'ok':true};									
			}
		}

		function mensaje(string){
			
			if ((string=="")||(string==undefined)){
				StyleCss(1);
				return ("Please enter data first");
			}else if(NumItem(string.split(','))<=3){
					StyleCss(0);
					return("Enjoy!");
			
			}else{
				StyleCss(0);
				return("Too much!");
			}
		};


	};

	

})();