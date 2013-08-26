'use strict';

angular.module('chhResourcesApp')
  .directive('dropzone', ['$http', '$cookies', function($http, $cookies){
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A',
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function(scope, elem, attrs) {
        $.event.props.push("dataTransfer");

        elem.bind('dragover', function(event) {
          event.stopPropagation();
          event.preventDefault();
          elem.addClass('dragged');
        });

        elem.bind('dragleave', function(event) {
          event.stopPropagation();
          event.preventDefault();
          elem.removeClass('dragged');
        });

        elem.bind('drop', function(event) {
          event.stopPropagation();
          event.preventDefault();

          var file = event.dataTransfer.files[0];
          var fd = new FormData();
          fd.append('file', file);


          function uploadProgress(evt) {
            if (evt.lengthComputable) {
              $('.bar').css('width', Math.round(evt.loaded * 100 / evt.total) + '%');
            } else {
              $('.bar').html('<p>Can not compute...</p>');
            }
          }

          function uploadComplete(evt) {
            $('.progress').remove();
            var callback = $.parseJSON(evt.target.responseText);
            if (callback.status == 'success') {
              scope.$parent.resourceModel.img_url = callback.url;
            }
            else {
              console.log('upload failed');
            }
          }

          function uploadFailed() {
            console.log('There was an error attempting to upload the file.');
          }

          function uploadCanceled() {
            console.log('The upload has been canceled by the user or the browser dropped the connection.');
          }

          /**
           *
           * XHR
           *
           */
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', uploadProgress, false);
          xhr.addEventListener('load', uploadComplete, false);
          xhr.addEventListener('error', uploadFailed, false);
          xhr.addEventListener('abort', uploadCanceled, false);
          xhr.open('POST', '/api/resources/image');
          xhr.setRequestHeader('X-CSRF-TOKEN', $cookies['XSRF-TOKEN']);
          xhr.send(fd);

          $('<div class="progress progress-striped active"><div class="bar"></div></div>')
            .insertBefore('.modal__cover-image');

          /**
           *
           * FileReader
           *
           */
          var reader = new FileReader();

          reader.onload = (function(theFile) {
            return function(e) {
              var division = document.createElement('div');
              division.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
              $('#upload-cover-image').html(division);
              $('#upload-cover-image').addClass('dropped');
            };
          })(file);

          reader.readAsDataURL(file);
        });
      }
    };
  }]);
