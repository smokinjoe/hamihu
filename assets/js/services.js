/* globals $, _ */
(function () {
  'use strict';

  angular.module('hamihu.services', []);

  /*
   * Player
   */
  angular.module('hamihu.services').
    factory('Player', [function () {
      var Player = function (name) {
        this.name = name;
        this.stats = [];
      };

      return Player;
    }]);


  /*
   * Stats
   */
  angular.module('hamihu.services').
    factory('Stat', [function () {
      var Stat = function (name) {
        this.name = name;
        this.value = 0;
      };

      return Stat;
    }]);

}());
