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
    this.id = playerIndex++;
    this.class = "Player";

    this.name = player.name;
    this.stats = [];
    players.push(this);
  };

  Player.prototype.destroy = function () {
    var self = this;
    return _.remove(players, function (p) {
      return p.id === self.id;
    });
  };

  Player.prototype.addStat = function (stat) {
    var self = this;
    // add from main array
    return self;
  };

  var _getPlayer = function (id) {
    var player = players.filter(function (p) {
      return p.id === id;
    });
    return player[0];
  };

  return {
    addPlayer : function (player) {
      return new Player(player);
    },
    getPlayer : function (id) {
      return _getPlayer(id);
    },
    removePlayer : function (id) {
      return _getPlayer(id).destroy();
    },
    allPlayers : function () {
      return players;
    }
  };

}());

// app.addPlayer({ name: "Joe" }); 

// prime
app.addPlayer({ name: "player1" }); app.addPlayer({ name: "player2" }); app.addPlayer({ name: "player3" }); app.addPlayer({ name: "player4" });