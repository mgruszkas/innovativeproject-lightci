/**
 * Created by krysiu-ibisz on 1/6/15.
 */
'use strict';

angular.module('lightciApp')
  .controller('settingsFormCtrl', function ($scope, $http, $location) {

    $scope.baseUrl = '#' + $location.path();
    $scope.hasError = false;
    $scope.hasInfo = false;
    $scope.message = "";
    $scope.restore = false;

    getConfigs();

    $scope.formData = {};
    $scope.plugins = [
      { "name": "UberPlugin-1.0.3", "active": true },
      { "name": "MegaPlugin-2.0.0", "active": false },
      { "name": "MercurialRepo2", "active": true }
    ];

    $scope.goBack = function() {
      window.history.back();
    }

    function getConfigs() {
      $http.get('/api/configs').success(function (cfgs) {
        $scope.cfgs = cfgs;
        $scope.formData.queue_max = cfgs[cfgs.length-1].maxBuildingProjects;
      });
    };

    $scope.restoreConfig = function(id) {
      var data = { id: id };
      $http.post('/api/configs', data).success(function (result) {
        if (result.success) {
          $location.path("#");
        } else {
          $scope.hasError = true;
          $scope.message = result.message;
        }
      });
    };

    $scope.saveSettings = function() {
      var data = { queue_max: $scope.formData.queue_max };
      $http.put('/api/configs', data).success(function (result) {
        if (result.success) {
          $location.path("#");
        } else {
          $scope.hasError = true;
          $scope.message = result.message;
        }
      });
    }
  });
