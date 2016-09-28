'use strict';

angular.module('myApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.welcome = 'Colorblocker';
    $scope.buttonText = 'Start';
  }])
