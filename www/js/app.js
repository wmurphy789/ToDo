// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('Main', function($scope, $ionicPopup) {
  // Get all items in local storage
  var allItems = JSON.parse(window.localStorage.getItem('toDo')) ? JSON.parse(window.localStorage.getItem('toDo')) : [];
  $scope.items = [];
  // hides clear button until at least one item is checked
  $scope.hidden = false;
  // Loop through all Items, so we can display each title
  for(var i = 0; i < allItems.length; i++) {
	  $scope.items.push({title: allItems[i].title, checked: allItems[i].checked});
	  if(allItems[i].checked) {
	  	$scope.hidden = true;
	  }
  }
  
  // When a new item is added
  $scope.additems = function() {
  	var newItem = document.getElementById("new_item").value;
  	// check to make sure something was typed into the box
  	if(newItem != '') {
		$scope.items.push({title: newItem, checked: false});
		allItems.push({"title":newItem, "checked":false});
		window.localStorage.setItem('toDo', JSON.stringify(allItems));

		document.getElementById("new_item").value = '';
	} else {
		// Display popup if user doesn't enter anything in
		var alertPopup = $ionicPopup.alert({
      		title: 'Enter an item',
      		template: ''
    	});
    	alertPopup.then(function(res) {
      		console.log('Error');
    	});
	}
  }
  
  // When an item is finished
  $scope.check = function(item) {
  	// Loop through to find the item index
	var index = -1;
	for(var i = 0; i < allItems.length; i++) {
		if (allItems[i].title === item.title) {
			index = i;
			break;
		}
	}
	
	// If the item will be checked
  	if(item.checked === true) {
		item.checked = true;
		allItems[index].checked = true;
		window.localStorage.setItem('toDo', JSON.stringify(allItems));
		$scope.hidden = true;
	} else { // otherwise uncheck item
		item.checked = false;
		allItems[index].checked = false;
		window.localStorage.setItem('toDo', JSON.stringify(allItems));
		$scope.hidden = false;
	}
  }
  
  // Remove all Items that are checked(finished)
  $scope.clearItems = function() {
  	var i = allItems.length;
  	while(i--) {
		if (allItems[i].checked === true) {
			allItems.splice(i,1);
			$scope.items.splice(i,1);
		}
	}

	// hide clear button
	$scope.hidden = false;
	window.localStorage.setItem('toDo', JSON.stringify(allItems));
  }
})
