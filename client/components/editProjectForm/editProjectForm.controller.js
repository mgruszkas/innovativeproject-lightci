/**
 * Created by jacek-stachurski on 24.11.14.
 */
'use strict';

angular.module('lightciApp')
  .controller('editProjFormCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.baseUrl = '#'+$location.path();

    var scriptsNo = 0;
    var scriptsVis = [];
    var currentScriptId = 0;

    $scope.project_name = $routeParams.project_name;
    $scope.formData = { project_name: $scope.project_name };
    $scope.formData.scripts = [];

    $http.get('/api/editproject', { params: { project_id: $routeParams.project_id } }).success(function (config) {
        $scope.formData.project_name = config.projectName;
        $scope.formData.project_url = config.repositoryUrl;
        $scope.formData.project_repo = config.repositoryType;
        $scope.formData.project_pattern = config.cronePattern;
        $scope.formData.project_usecrone = config.useCrone;
        $scope.formData.project_strategy = config.strategy;
        $scope.formData.project_usedeploy = config.useDeployServer;
        $scope.formData.project_serverusername = config.serverUsername;
        $scope.formData.project_serverpassword = config.serverPassword;
        $scope.formData.project_serveraddress = config.serverAddress;
        $scope.formData.project_filepath = config.deployFilePath;
        $scope.formData.project_serverscript = config.serverScript;
        $scope.formData.project_username = config.repositoryUsername;
        $scope.formData.project_password = config.repositoryPassword;
        $scope.formData.project_dependencies = config.dependencies;

        for (var i=0; i<config.scripts.length; i++) {
          currentScriptId += 1;
          scriptsNo += 1;
          scriptsVis[i] = false;
          $scope.formData.scripts[i] = {
            scriptId: currentScriptId,
            scriptContent: config.scripts[i].scriptContent,
            parser: config.scripts[i].parser,
            outputPath: config.scripts[i].outputPath
          }
        }
    });

    $scope.addScript = function(i) {
      scriptsNo += 1;
      currentScriptId += 1;
      $scope.formData.scripts.splice(i+1, 0, { scriptId: currentScriptId, scriptContent: '', parser: 'default', outputPath: ''});
      scriptsVis.splice(i+1, 0, true);
    }

    $scope.toggleScript = function(i) {
      scriptsVis[i] = !scriptsVis[i];
    }

    $scope.showScript = function(i) {
      return scriptsVis[i];
    }

    $scope.removeScript = function(i) {
      scriptsNo -= 1;
      $scope.formData.scripts.splice(i, 1);
      scriptsVis.splice(i, 1);
    }

    $scope.moveUpScript = function(i) {
      if (i > 0) {
        $scope.formData.scripts.swap(i, i - 1);
        scriptsVis.swap(i, i-1);
      }
    }

    $scope.moveDownScript = function(i) {
      if (i < scriptsNo-1) {
        $scope.formData.scripts.swap(i, i + 1);
        scriptsVis.swap(i, i+1);
      }
    }

    $scope.editProject = function() {
      var data = $scope.formData;
      $http.post('/api/editproject', data ).success(function (result) {

        if (result.error) {
          $scope.hasError = true;
          $scope.hasInfo = false;
          $scope.message = result.error;
        }

        if (result.info) {
          $scope.hasInfo = true;
          $scope.hasError = false;
          $scope.message = result.info;

          $location.path("#");
        }
      });
    }

    $scope.goBack = function() {
      window.history.back();
    }

    Array.prototype.swap = function (x,y) {
      var b = this[x];
      this[x] = this[y];
      this[y] = b;
      return this;
    }
  });
