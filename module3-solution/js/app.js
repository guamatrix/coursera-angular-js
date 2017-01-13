(function(){

	'use strict';


	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItems)
	.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

	function FoundItems(){
		var ddo={
			templateUrl:'loader/itemsloaderindicator.html',
			scope:{
				found:'<',
				mensaje:'=',
				onRemove:'&'
			},	
	    	controller: NarrowItDownController,
    		controllerAs: 'ctrl',
    		bindToController: true,
    		//link: FoundItemsLink,
    		//transclude:true
 	 	};

  	return ddo;
	}

	//function FoundItemsLink(scope, element, attrs, controller){
		
	//	scope.$watch('ctrl.isEmpty()', function(newValue, oldValue){
	//		if (newValue===true){
	//			console.log("vacio");
	//		}else{
	//			console.log("datos tiene");
	//		}
	//	});
	//}

	MenuSearchService.$inject=['$http','ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service= this;

		service.getMatchedMenuItems= function(searchTerm){
			
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})

			.then(function (response){

				var foundItems=[];
				var data = response.data;
				var search = searchTerm.toLowerCase();

				for(var i=0; i < data.menu_items.length; i++){

					var dataSearch = data.menu_items[i].description.toLowerCase();
					if(searchTerm!=undefined && dataSearch.indexOf(search)>=0){
						
						foundItems.push(data.menu_items[i]);
					}
				}
				//console.log(foundItems);
				return {foundItems:foundItems};
			})

			.catch(function (error){
				console.log(error);

			});
		};
	}


	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var ctrl = this;
		
		ctrl.NarrowIt= function(){
			ctrl.found=[];
			if (ctrl.searchTerm==undefined || ctrl.searchTerm ==""){

				ctrl.mensaje=true;

			}else{
				ctrl.mensaje=false;
				MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
				.then( function(result){

					ctrl.found=result.foundItems;
					//console.log(ctrl.found);
					//if(.length < 1){
						ctrl.mensaje=ctrl.isEmpty(ctrl.found);
					//}

				})
				
				
			}
		}

		ctrl.removeItem= function(index){

				ctrl.found.splice(index,1);
				ctrl.mensaje= ctrl.isEmpty(ctrl.found);
			
			
		}
		ctrl.isEmpty= function (list){
			if (list===undefined || list.length<1){
				return true;
			}else{
				return false;	
			}
		}
	}


})();