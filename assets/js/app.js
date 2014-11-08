/* globals $, _ */


(function () {
  "use strict";

  angular.module('hamihu.services').
    factory('Quarterback', [function() {
      var Lesson = function (name) {
        this.name = name;
        this.stats = [];
      };

      //angular.extend(Lesson.prototype, {
      //  echo : function () {
      //    alert(this.name);
      //  }
      //});

      return Lesson;
    }]);
}());

//(function () {
//  "use strict";
//
//  angular.module('hamihu.controllers').
//    controller('HomeCtrl', ['Quarterback',
//      function (Quarterback) {
//        $('#action').click(function () {
//          //var qb = Quarterback.new('tom brady');
//          //qb.echo();
//        });
//
//      }]);
//}());

//var app = angular.module('hamihu.app', ['hamihu.controllers']);

//app.run();