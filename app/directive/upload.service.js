(function () {
    'use strict';

    //Create a service to handle with Wistia API
    angular
        .module('AppWistia')
        .factory('WistiaService', WistiaService);

    WistiaService.$inject = [
        '$http'
    ];

    /**
     *
     **/

    function WistiaService($http) {
        console.log('... WistiaService');

        return {
            getMedia: function(id, pass) {
                return $http.get('https://api.wistia.com/v1/medias/' + id + '.json?api_password=' + pass);
            },

        };
    }
})();
