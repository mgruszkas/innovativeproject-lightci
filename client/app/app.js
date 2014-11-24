'use strict';

angular.module('lightciApp', [

  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/projectsTable/projectsTable.html',
        controller: 'ProjTableCtrl'
      })
      .when('/project/:project_id/:project_name', {
        templateUrl: 'components/buildsTable/buildsTable.html',
        controller: 'BuildTableCtrl'
      })
      .when('/project/:project_id/:project_name/build/:build_id', {
        templateUrl: 'components/buildsInfoTable/buildsInfoTable.html',
        controller: 'BuildInfoTableCtrl'
      })
      .when('/new', {
        templateUrl: 'components/newProjectForm/newProjectForm.html',
        controller: 'newProjFormCtrl'
      })
      .when('/project/:project_id/:project_name/edit', {
        templateUrl: 'components/editProjectForm/editProjectForm.html',
        controller: 'editProjFormCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
