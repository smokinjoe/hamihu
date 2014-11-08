var app = (function () {
  // privates
  var players = [],
      playerIndex = 1;
  var stats = [],
      statIndex = 1;
  var CONSTANTS = {
    Classes: {
      Stat : "Stat",
      Player : "Player",
      PlayerStat : "PlayerStat"
    }
  };

  // Stat class stuff
  var Stat = function (stat) {
    if (stat) {
      this.id = statIndex++;
      this.class = CONSTANTS.Classes.Stat;

      this.name = stat.name;
      stats.push(this);
    }
    else {
      return {
        class : function () {
          return CONSTANTS.Classes.Stat;
        },
        get : function (id) {
          return stats.filter(function (s) {
            return s.id === id;
          });
        },
        all : function () {
          return stats;
        }
      };
    }
  };

  Stat.prototype.destroy = function () {
    var self = this;
    var stat = _.remove(stat, function (s) {
      return s.id === self.id;
    });
    digest();
    return stat;
  };

  Stat.prototype.update = function (data) {
    this.name = data.name ? data.name : this.name;
    digest();
    return this;
  };

  Stat.prototype.createPlayerStat = function (value) {
    var stat = new PlayerStat(this);
    stat.updateValue(value);
    digest();
    return stat;
  };

  // Player Stat
  var PlayerStat = function (stat) {
    this.class = CONSTANTS.Classes.PlayerStat;
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
      this.class = CONSTANTS.Classes.Player;

      this.name = player.name;
      this.stats = [];
      players.push(this);
      digest();
    }
    else {
      return {
        class : function () {
          return CONSTANTS.Classes.Player;
        },
        get : function (id) {
          var player = players.filter(function (p) {
            return p.id === id;
          });
          return player[0];
        },
        all : function () {
          return players;
        }
      };
    }
  };

  Player.prototype.destroy = function () {
    var self = this;
    var player = _.remove(players, function (p) {
      return p.id === self.id;
    });
    digest();
    return player;
  };

  Player.prototype.update = function (data) {
    this.name = data.name ? data.name : this.name;
    this.stats = data.stats ? data.stats : this.stats;
    digest();
    return this;
  };

  Player.prototype.updatePlayerStats = function (stat) {
    if (stat.class !== CONSTANTS.Classes.PlayerStat) {
      return;
    }

    var filteredStats = _.filter(this.stats, function (s) {
      return s.stat_id === stat.stat_id;
    });

    if (!filteredStats.length) {
      this.stats.push(stat);
      digest();
      return true;
    }
    return false;
  };

  // Utility methods

  var init = function () {
    var sessionPlayers, sessionStats;
    // check on sessionStorage
    if (sessionStorage) {
      sessionPlayers = JSON.parse(sessionStorage.getItem("hamihu.players")) || [];
      sessionStats = JSON.parse(sessionStorage.getItem("hamihu.stats")) || [];

      if (sessionPlayers.length) {
        players.push(sessionPlayers);
        playerIndex = players.length;
      }

      if (sessionStats.length) {
        stats.push(sessionStats);
        statsIndex = stats.length;
      }
    }

  };

  var digest = function () {
    // update session storage
    sessionStorage.setItem("hamihu.players", JSON.stringify(Player().all()));
    sessionStorage.setItem("hamihu.stats", JSON.stringify(Stat().all()));
  };

  return {
    init : function () {
      init();
    },

    createPlayer : function (playerData) {
      var player = new Player(playerData);
      Stat().all().forEach(function (s) {
        var playerStat = s.createPlayerStat(0);
        player.updatePlayerStats(playerStat);
      });
      return player;
    },
    getPlayer : function (id) {
      return Player().get(id);
    },
    removePlayer : function (id) {
      return Player().get(id).destroy();
    },
    allPlayers : function () {
      return Player().all();
    },

    createStat : function (statData) {
      var stat = new Stat(statData);
      var playerStat = stat.createPlayerStat(0);
      Player().all().forEach(function (p) {
        p.updatePlayerStats(playerStat);
      });
      return stat;
    },
    getStat : function (id) {
      return Stat().get(id);
    },
    removeStat : function (id) {
      return Stat().get(id).destroy();
    },
    allStats : function () {
      return Stat().all();
    }

  };

}());

var updateTable = function () {
  var players = app.allPlayers(),
      stats = app.allStats(),
      $table = $("#player-table");

  $table.find('thead tr').html('<th>Name</th>');
  stats.forEach(function (s) {
    $table.find('thead tr').append('<th data-id="' + s.id + '">' + s.name + '</th>');
  });

  $table.find('tbody').html('');
  players.forEach(function (p) {
    var $tr = $("<tr />");
    $tr.append('<td>' + p.name + '</td>');
    p.stats.forEach(function (s) {
      $tr.append('<td>' + s.value + '</td>');
    });
    $tr.data('id', p.id);
    $table.find('tbody').append($tr);
  });
};

$("#player-form").submit(function () {
  var $form = $(this),
      $input = $form.find('.name');

  if ($input.val() !== '') {
    app.createPlayer({ name: $input.val() });
    $input.val('');
    updateTable();
  }
  return false;
});

$("#stat-form").submit(function () {
  var $form = $(this),
      $input = $form.find('.name'),
      stat;

  if ($input.val() !== '') {
    app.createStat({ name: $input.val() });
    $input.val('');
    updateTable();
  }
  return false;
});

$(document).ready(function () {
  app.init();
});










