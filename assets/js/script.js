var app = (function () {
  // privates
  var players = [],
      playerIndex = 1;
  var stats = [],
      statIndex = 1;

  // Stat class stuff
  var Stat = function (stat) {
    if (stat) {
      this.id = statIndex++;
      this.class = "Stat";

      this.name = stat.name;
      stats.push(this);
    }
    else {
      return {
        get : function (id) {
          return stats.filter(function (s) {
            return s.id === id;
          });
        }
      };
    }
  };

  Stat.prototype.destroy = function () {
    var self = this;
    return _.remove(stat, function (s) {
      return s.id === self.id;
    });
  };

  Stat.prototype.update = function (data) {
    this.name = data.name ? data.name : this.name;
    return this;
  };

  Stat.prototype.createPlayerStat = function (value) {
    var stat = new PlayerStat(this);
    stat.updateValue(value);
    return stat;
  };

  // Player Stat
  var PlayerStat = function (stat) {
    this.class = "PlayerStat";
    this.stat_id = stat.id;
    this.name = stat.name;
  };

  PlayerStat.prototype.updateValue = function (value) {
    this.value = value;
  };

  // Player class stuff
  var Player = function (player) {
    if (player) {
      this.id = playerIndex++;
      this.class = "Player";

      this.name = player.name;
      this.stats = [];
      players.push(this);
    }
    else {
      return {
        get : function (id) {
          var player = players.filter(function (p) {
            return p.id === id;
          });
          return player[0];
        }
      };
    }
  };

  Player.prototype.destroy = function () {
    var self = this;
    return _.remove(players, function (p) {
      return p.id === self.id;
    });
  };

  Player.prototype.update = function (data) {
    this.name = data.name ? data.name : this.name;
    this.stats = data.stats ? data.stats : this.stats;
    return this;
  };

  Player.prototype.updatePlayerStats = function (stat) {
    if (stat.class !== "PlayerStat") {
      return;
    }

    var filteredStats = _.filter(this.stats, function (s) {
      return s.stat_id === stat.stat_id;
    });

    if (!filteredStats.length) {
      this.stats.push(stat);
      return true;
    }
    return false;
  };

  return {
    createPlayer : function (player) {
      return new Player(player);
    },
    getPlayer : function (id) {
      return Player().get(id);
    },
    removePlayer : function (id) {
      return Player().get(id).destroy();
    },
    allPlayers : function () {
      return players;
    },

    createStat : function (stat) {
      return new Stat(stat);
    },
    getStat : function (id) {
      return Stat().get(id);
    },
    removeStat : function (id) {
      return Stat().get(id).destroy();
    },
    allStats : function () {
      return stats;
    },

    createPlayerStat : function (config) {
      var playerStat;
      config = config || {};
      
      if (config.stat && config.player) {
        playerStat = config.stat.createPlayerStat(config.value);
        config.player.updatePlayerStats(playerStat);
        return config.player;
      }

      return false;
    }

  };

}());

// app.createPlayer({ name: "Joe" }); 

// prime
//app.createPlayer({ name: "player1" }); app.createPlayer({ name: "player2" }); app.createPlayer({ name: "player3" }); app.createPlayer({ name: "player4" });
//var stat = app.createStat({ name: 'stat' });
//var player = app.getPlayer(1);
//app.createPlayerStat({ player: player, stat: stat, value: 58 });


var updatePlayerTable = function () {
  var players = app.allPlayers(),
      $table = $("#player-table");

  $table.find('tbody').html('');
  players.forEach(function (p) {
    $table.find('tbody').append('<tr><td>' + p.name + '</td></tr>');
  });
};

$("#player-form").submit(function () {
  var $form = $(this);
  app.createPlayer({ name: $form.find('.name').val() });
  updatePlayerTable();
  return false;
});














