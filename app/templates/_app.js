angular.module('<%= appModule %>', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  '<%= appModule %>.controllers.Main'
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/',          {templateUrl: 'home.html'});
});