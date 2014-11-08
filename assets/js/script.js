var app = (function () {
  // privates
  var players = [],
      playerIndex = 1;

  var stats = [],
      statIndex = 1;

  var Stat = function (stat) {
    this.id = statIndex++;
    this.class = "Stat";
    this.name = stat.name;
    this.value = stat.value;
    stats.push(this);
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
          return players.filter(function (p) {
            return p.id === id;
          });
        }
      };
    }
  };

  Player.prototype.destroy = function () {
  };

  Player.prototype.addStat = function (stat) {
    var self = this;
    // add from main array
    return self;
  };

  return {
    addPlayer : function (player) {
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
    }
  };

}());

// app.addPlayer({ name: "Joe" }); 

// prime
app.addPlayer({ name: "player1" }); app.addPlayer({ name: "player2" }); app.addPlayer({ name: "player3" }); app.addPlayer({ name: "player4" });