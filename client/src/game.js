'use strict';

angular.module('myApp')
  .controller('GameCtrl', ['$scope', function ($scope) {
    $scope.header = "Which tile is different?"
    $scope.lvlmap = [2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

    $scope.classes = [
      'lv0', 'lv1', 'lv2', 'lv3',
      'lv4', 'lv5', 'lv6', 'lv7',
      'lv8', 'lv9'
    ];

    $scope.lvl = 0;

    $scope.getClass = function () {
      return $scope.classes[$scope.lvlmap[$scope.lvl]]
    }

    $scope.getBaseColor = function () {
      return [(Math.random() * 360), (10 + Math.random() * 80), (10 + Math.random() * 80)]
    };

    $scope.getDiffColor = function (baseColor) {
      var difference = 10 - $scope.lvlmap[$scope.lvl];
      var diffColor = [baseColor[0]];
      if (Math.round(Math.random())) {
        diffColor.push(baseColor[1] + difference);
        diffColor.push(baseColor[2] + difference);
      } else {
        diffColor.push(baseColor[1] - difference);
        diffColor.push(baseColor[2] - difference);
      }
      return diffColor;
    };

    $scope.nextLevel = function (block) {
      if ($scope.blocks[block]) {
        $scope.lvl++;
        $scope.colors = [];
        $scope.blocks = $scope.grid();
      }
    }

    $scope.grid = function () {
      var arr = [];
      var len = Math.pow($scope.lvlmap[$scope.lvl], 2);
      var rand = Math.floor((Math.random() * len));
      var baseColor = $scope.getBaseColor();
      var diffColor = $scope.getDiffColor(baseColor);
      var baseStyle = {
        'background-color': 'hsl(' + baseColor[0] + ',' + baseColor[1] + '%,' + baseColor[2] + '%)'
      };
      var diffStyle = {
        'background-color': 'hsl(' + diffColor[0] + ',' + diffColor[1] + '%,' + diffColor[2] + '%)'
      };
      for (var i = 0; i < len; i++) {
        if (i === rand) {
          arr.push(true);
          $scope.colors.push(diffStyle);
        } else {
          arr.push(false);
          $scope.colors.push(baseStyle);
        }
      }
      return arr;
    }

    $scope.colors = [];
    $scope.blocks = $scope.grid();
  }])
  .controller('TimeCtrl', function ($scope, $timeout, $location) {
    $scope.counter = 60;
    $scope.onTimeout = function(){
        $scope.counter--;
        // if ($scope.counter <= 0) {
        //   $scope.counter = 60;
        //   // $timeout.cancel(mytimeout);
        //   $location.path("/");
        // }
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
  });
