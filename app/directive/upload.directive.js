(function () {
    'use strict';

    angular
        .module('AppWistia')
        .directive('uploadwistia', uploadWistiaDirective);

    uploadWistiaDirective.$inject = [
        '$sce',
        '$timeout',
        'WistiaService',
    ];

    function uploadWistiaDirective($sce, $timeout, WistiaService) {

        return {
            restrict: 'E',
            templateUrl: 'directive/uploadWistiaPartial.html',
            replace: true,
            link: link,
            scope: {
                id: "@id"
            }
        };

        function link(scope) {

            scope.hashId = '';
            scope.url = '';
            scope.status = 'Waiting video upload';
            scope.progress = 0;
            scope.pass = 'c1bc7aee32830db88af6dd19fc12189cb1ac133248e18b2b480dffd6a73e6809';

            //Function to check the state of video

            scope.StatusState = function () {

                //Wistia Service to get medias with media ID and User Token

                WistiaService.getMedia(scope.hashId, scope.pass).then(function (data) {
                    scope.status = data.data.status || '';

                    //Check video upload status and change messages or pass it to iframe
                    if (scope.status == 'ready') {
                        scope.url = $sce.trustAsResourceUrl('https://fast.wistia.net/embed/iframe/' + scope.hashId);
                        scope.status = 'Upload ok! :)';
                    } else if (scope.status != 'failed') {
                        scope.status = 'Processing and generating preview..'
                        $timeout(function () {
                            scope.StatusState();
                        }, 2000);
                    } else if (scope.status == 'failed') {
                        scope.status = 'Upload failed! :('
                    }

                });
            };

            //Check when user upload something
            $timeout(function () {
                $('#' + scope.id + '__input').fileupload({
                    dataType: 'json',
                    formData: {
                        api_password: scope.pass
                    },

                    add: function (e, data) {
                        scope.status = 'Uploading Video...';
                        scope.hashId = '';
                        scope.url = '';
                        scope.progress = 0;

                        data.submit();
                    },

                    progressall: function (e, data) {
                        if (data.total > 0) {
                            scope.$apply(function(){
                                scope.progress = parseInt(data.loaded / data.total * 100, 10);
                            });
                        }
                    },

                    done: function (e, data) {
                        if (data.result.hashed_id != '') {
                            scope.hashId = data.result.hashed_id;
                            scope.StatusState();
                        }
                    }
                });
            });
        }
    }
})();
