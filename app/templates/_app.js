angular.module('<%= appModule %>', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  '<%= appModule %>.controllers.Main'
])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html'});
}]);