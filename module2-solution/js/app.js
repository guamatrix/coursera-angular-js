(function(){
'use strict'


angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService)

//controller list buy
ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	// body...
	var lisToBuy=this;

	lisToBuy.items=ShoppingListCheckOffService.getItemsToBuy();
	

	lisToBuy.Buy=function(item, itemIndex){
		ShoppingListCheckOffService.Buy(item, itemIndex);
	};
}


//controller list bought
AlreadyBoughtController.$inject=["ShoppingListCheckOffService",'$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService,$scope){
	var listBough = this;
	listBough.items = ShoppingListCheckOffService.getItemsBought();
}

//service
function ShoppingListCheckOffService(){
	var service =this;
	var itemsToBuy = [{name:"Pepsi", quantity:10},{name:"Coca-Cola", quantity:12},{name:"Cookies", quantity:8},
					 {name:"coffe", quantity:1},{name:"Pringles", quantity:11}];
	var itemsBought=[];
	service.getItemsToBuy = function(){
		return itemsToBuy;
	};

	service.getItemsBought=function(){
		return itemsBought;
	};

	service.Buy=function(item, itemIndex){
		itemsBought.push(item);
		itemsToBuy.splice(itemIndex,1);
	};
}


})()