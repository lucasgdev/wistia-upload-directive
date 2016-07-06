(function() {
  'use strict';

  angular
    .module('AppWistia')
    .directive('uploadwistia', uploadWistiaDirective);

  uploadWistiaDirective.$inject = [
    '$http',
    '$sce',
    '$timeout',
    'WistiaService',
  ];

  function uploadWistiaDirective($http, $sce, $timeout, WistiaService) {

    return {
      restrict: 'E',
      templateUrl: 'uploadFileTemplate.html',
      replace: true,
    };

  }
})();
