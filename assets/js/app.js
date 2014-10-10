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
    if ($scope.initialize == undefined){
      localStorageService.set('cuenta0',3000);
      localStorageService.set('cuenta1',8000);
      localStorageService.set('cartera',28000);
      $scope.initialize = true;
    }

    $scope.cuentas = []
    $scope.cuentas[0] = localStorageService.get('cuenta0');
    $scope.cuentas[1] = localStorageService.get('cuenta1');
    $scope.cartera = localStorageService.get('cartera');
    //$scope.cuentas[4] = localStorageService.get('cuenta1');

    //$scope.$watch('cuentaA', function(value){
      //localStorageService.set('cuentaA',value);
      //$scope.cuentaA = localStorageService.get('cuentaA');

      //$scope.cuentaB = localStorageService.get('cuentaB');
      //localStorageService.set('cuentaB',value);
    //});

    $scope.storageType = 'Local storage';

    if (localStorageService.getStorageType().indexOf('session') >= 0) {
      $scope.storageType = 'Session storage';
    }

    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }
  }
]);