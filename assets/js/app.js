angular.module('BancoModule', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('bancoPrefix');
  localStorageServiceProvider.setStorageCookieDomain('banco.com');
  localStorageServiceProvider.setStorageType('sessionStorage');
}])
.controller('CuentasCtrl', [
  '$scope',
  'localStorageService',
  function($scope, localStorageService) {
    
    $scope.$watch('cuentaA', function(value){
      if ($scope.initialize == undefined){
        localStorageService.set('cuentaA',3000);
        localStorageService.set('cuentaB',8000);
      }
      //localStorageService.set('cuentaA',value);
      $scope.cuentaA = localStorageService.get('cuentaA');
      $scope.cuentaB = localStorageService.get('cuentaB');
    });

    $scope.storageType = 'Local storage';

    if (localStorageService.getStorageType().indexOf('session') >= 0) {
      $scope.storageType = 'Session storage';
    }

    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }
  }
]);