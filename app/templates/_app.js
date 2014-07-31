angular.module('<%= appModule %>', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  '<%= appModule %>.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html'});
});