/* globals $, _ */
(function () {
  'use strict';

  angular.module('hamihu.services', []);

  /*
   * Player
   */
  angular.module('hamihu.services').
    factory('Player', [function() {
      var Player = function (name) {
        this.name = name;
        this.stats = [];
      };

      return Player;
    }]);

}());
