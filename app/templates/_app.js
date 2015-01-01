angular.module('<%= appModule %>', [
  'ngRoute',
  'mobile-angular-ui',
  '<%= appModule %>.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});