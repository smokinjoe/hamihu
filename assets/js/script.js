var app = (function () {
  // privates
  var players = [],
      playerIndex = 1;

  var Player = function (player) {
    this.id = playerIndex++;
    this.class = "Player";

    this.name = player.name;
    this.stats = [];
  };

  Player.prototype


  var _createPlayer = function (newPlayer) {
    var player = new Player(newPlayer);
    players.push(player);
    return player;
  };
  var _getPlayer = function (id) {
    var player = players.filter(function (p) {
      return p.id === id;
    });
    return player;
  };
  var _destroyPlayer = function (id) {
    return _.remove(players, function (p) {
      return p.id === id;
    });
  };

  return {
    addPlayer : function (data) {
      return _createPlayer(data);
    },
    getPlayer : function (id) {
      return _getPlayer(id);
    },
    removePlayer : function (id) {
      return _destroyPlayer(id);
    },
    allPlayers : function () {
      return players;
    }
  };

}());

// app.addPlayer({ name: "Joe" }); 

// prime
app.addPlayer({ name: "player1" }); app.addPlayer({ name: "player2" }); app.addPlayer({ name: "player3" }); app.addPlayer({ name: "player4" });