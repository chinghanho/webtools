'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl', ['$scope', 'resourcesData', 'typesList',
    function ($scope, resourcesData, typesList) {

    // var dataForDevelopment = [
    //   {
    //     "url": "http://docs.sublimetext.tw/",
    //     "img_url": "/uploads/pictures/resources/1376212196983_螢幕快照 2013-08-11 上午11.33.47.png",
    //     "description": "Sublime Text 是 2012、2013 最受歡迎的程式編輯器，Sublime Text 手冊適合剛使用 Sublime Text 的使用者作為入門導讀，能夠更快地瞭解 Sublime Text 的強大功能；也適合已經長期使用 Sublime Text 作為主力編輯器的 developer，隨時查詢功能的線上手冊！",
    //     "name": "Sublime Text 手冊",
    //     "_id": "5207557e2ed751c28a000001",
    //     "__v": 0
    //   },
    //   {
    //     "url": "http://example.com",
    //     "img_url": "/uploads/pictures/resources/1376296592090_螢幕快照 2013-08-11 上午11.17.47.png",
    //     "description": "Description.... XDD",
    //     "name": "Resource name",
    //     "_id": "52089ea4280a420000000001",
    //     "__v": 0
    //   },
    //   {
    //     "url": "http://google.com/chrome",
    //     "img_url": "/uploads/pictures/resources/1376296980564_螢幕快照 2013-08-11 下午2.43.20.png",
    //     "description": "The best browser in the world!",
    //     "name": "Chrome for Mac",
    //     "_id": "5208a030280a420000000002",
    //     "__v": 0
    //   },
    //   {
    //     "url": "http://example.com/resource/path",
    //     "img_url": "/uploads/pictures/resources/1376299054792_螢幕快照 2013-08-11 下午4.34.23.png",
    //     "description": "sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda sdjflkj dkfjaklsdfjklds jdlkf jds ksdjf lsadkj lkdsaj f;dsjflkasdj klsda",
    //     "name": "Here is the resource name....",
    //     "_id": "5208a83b280a420000000003",
    //     "__v": 0
    //   }
    // ]

    // var typesListForDevelopment = [
    //   {
    //     "_id": "520b37bc0264e40fa52a54fd",
    //     "name": "Tools",
    //     "create_at": "2013-08-14T08:15:49.191Z",
    //     "resources_count": 0
    //   },
    //   {
    //     "_id": "520b37cb0264e40fa52a54fe",
    //     "name": "jQuery",
    //     "create_at": "2013-08-14T08:15:49.191Z",
    //     "resources_count": 0
    //   },
    //   {
    //     "_id": "520b37d40264e40fa52a54ff",
    //     "name": "Javascript",
    //     "create_at": "2013-08-14T08:15:49.191Z",
    //     "resources_count": 0
    //   }
    // ]

    resourcesData.resources().then(function(resources) {
      $scope.resources = resources;
      // $scope.resources = dataForDevelopment;
    });

    typesList.types().then(function(types) {
      $scope.types = types;
      // $scope.types = typesListForDevelopment;
    })

  }]);
