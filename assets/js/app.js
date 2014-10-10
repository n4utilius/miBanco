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

    $scope.retirar = function(num_cuenta, monto){
      if( $scope.cuentas[num_cuenta] && monto <= $scope.cuentas[num_cuenta] ){
        $scope.cuentas[num_cuenta] -= monto
        $scope.cartera = parseInt($scope.cartera) + parseInt(monto) 
      }
    }

    $scope.depositar = function(num_cuenta, monto){
      if(monto <= $scope.cartera){
        $scope.cartera -= monto
        $scope.cuentas[num_cuenta] = parseInt($scope.cuentas[num_cuenta]) + parseInt(monto)
      }
    } 

    $scope.crear_cuenta = function(){
      var cuenta_nueva = 'cuenta' + String($scope.cuentas.length);
      localStorageService.set(cuenta_nueva, 0);
      $scope.cuentas.push( localStorageService.get(cuenta_nueva) )
    }

    $scope.$watch('cuentas', function(value){
      for (var i in value) localStorageService.set('cuenta' + i, value[i]);
    });

    $scope.$watch('cartera', function(value){
      localStorageService.set('cartera', parseInt(value));
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