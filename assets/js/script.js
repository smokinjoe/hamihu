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
    var self = this;
    self.name = data.name ? data.name : self.name;
    return self;
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
    var self = this;
    self.name = data.name ? data.name : self.name;
    self.stats = data.stats ? data.stats : self.stats;
    return self;
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
    }

  };

}());

// app.addPlayer({ name: "Joe" }); 

// prime
app.addPlayer({ name: "player1" }); app.addPlayer({ name: "player2" }); app.addPlayer({ name: "player3" }); app.addPlayer({ name: "player4" });