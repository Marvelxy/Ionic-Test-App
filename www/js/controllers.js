angular.module('app.controllers', ['ionic', 'app.services'])


.controller('SplashCtrl', function($scope, $state, User, $ionicLoading,$ionicPopup) {
	
  // attempt to signup/login via User.auth
  $scope.submitForm = function(email, password, signingUp) { 	
  	if(email === undefined && password === undefined){
			showAlert(signingUp,"Email and Password must be entered!");
		}
		else if((email === undefined || email === "") && (password === undefined || password === "")){
			showAlert(signingUp,"Email and Password must be entered!");
		}
		else if(email === undefined || email === ""){
			showAlert(signingUp,"Email must be entered!");
		}
		else if(password === undefined || password === ""){
			showAlert(signingUp,"Password must be entered!");
		}
  	else{
  		//console.log(email);
  		//console.log(password);
  		showLoading();
			User.auth(email, password, signingUp).then(function(data){
	      // session is now set, so lets redirect to discover page
	      //console.log(data.data);
	     
	      hideLoading();
	      $state.go('tab.discover');
	    }, function(data) {
	      // error handling here
	      console.log(data.data.error);
	      /*switch(data.data.error){
					case"e":
				}*/
	      showAlert(signingUp,data.data.error);
				hideLoading();
	    });	
		}
  };
  
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="ion-loading-a"></i>',
      noBackdrop: true
    });
  };
  
  var hideLoading = function() {
    $ionicLoading.hide();
  };
  
  // An alert dialog
 	var showAlert = function(signingUp,data) {
 		if (signingUp) {
       var alertPopup = $ionicPopup.alert({
		     title: 'Signup Notification',
		     template: data
		   });

		   /*alertPopup.then(function(res) {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });*/
    } 
    else {
      var alertPopup = $ionicPopup.alert({
		     title: 'Sign in Notification',
		     template: data
		   });

		   /*alertPopup.then(function(res) {
		     console.log('Thank you for not eating my delicious ice cream cone');
		   });*/
    }
 };
  
})


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations, $ionicLoading, $localstorage) {
	
	
	$scope.testTestPage = function(){
		User.testTestPage().then(function(data){
	    //console.log(data);
	    console.log(data.headers.common.Authorization);
	  }, function(data) {
	    console.log(data.headers.common);
	    //console.log(data);
	  });	
	};
	
	
	var user = $localstorage.getObject('user');
	$scope.user_email = user.email;
	
	// helper functions for loading
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>',
      noBackdrop: true
    });
  }

  var hideLoading = function() {
    $ionicLoading.hide();
  }

  // set loading to true first
  //showLoading();
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User, $window) {
  
  
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, Recommendations, User, $window) {
  
  $scope.logout = function() {
    User.destroySession();

    // instead of using $state.go, we're going to redirect.
    // reason: we need to ensure views aren't cached.
    $window.location.href = 'index.html';
  };
});