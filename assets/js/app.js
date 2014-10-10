angular.module('BancoApp', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('BancoApp');
  localStorageServiceProvider.setStorageCookieDomain('banco.com');
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setNotify(true, true);
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
    $scope.historial = []
    $scope.acciones = []

    $scope.cuentas[0] = localStorageService.get('cuenta0');
    $scope.cuentas[1] = localStorageService.get('cuenta1');
    $scope.cartera = localStorageService.get('cartera');

    $scope.retirar = function(num_cuenta, monto){
      if( $scope.cuentas[num_cuenta] && monto <= $scope.cuentas[num_cuenta] ){
        $scope.cuentas[num_cuenta] -= monto
        $scope.cartera = parseInt($scope.cartera) + parseInt(monto) 
        
        $scope.acciones.push("Se retiro la cantidad de $" + monto + " de la cuenta " + num_cuenta)
      }
    }

    $scope.depositar = function(num_cuenta, monto){
      if(monto <= $scope.cartera){
        $scope.cartera -= monto
        $scope.cuentas[num_cuenta] = parseInt($scope.cuentas[num_cuenta]) + parseInt(monto)
        
        $scope.acciones.push("Se deposito la cantidad de $" + monto + " a la cuenta " + num_cuenta)


        
      }
    } 

    $scope.crear_cuenta = function(){
      var cuenta_nueva = 'cuenta' + String($scope.cuentas.length);
      localStorageService.set(cuenta_nueva, 0);
      $scope.cuentas.push( localStorageService.get(cuenta_nueva) )
        
      $scope.acciones.push("Se creo la cuenta número " + ($scope.cuentas.length - 1) )

    }

    $scope.mostrar_ultimas_acciones = function(){
      if($scope.acciones.length == 0){
        $scope.historial.push("No se han realizado acciones")
      }else {
        if($scope.acciones.length == 1) $scope.historial = []
        for(var i in $scope.acciones)
          $scope.historial.push( $scope.acciones[i])
        $scope.acciones = []
      }
    }

    $scope.$watch('cuentas', function(value){
      for (var i in value) localStorageService.set('cuenta' + i, value[i]);
    });

    $scope.$watch('cartera', function(value){
      localStorageService.set('cartera', parseInt(value));
        if(value == 0) {
          $scope.mostrar_ultimas_acciones()
          alert("se ha depositado todo el dinero disponible en su cartera")
        }


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