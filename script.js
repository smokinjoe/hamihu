var app = (function () {
  // private stuffs
  var qbs = [];
  var qb_index = 0;
  var ranked = false;
  var Qb = function (_arg) {
    this.qb_name = _arg.qb_name;
    this.sb_titles = {
      'value' : _arg.sb_titles,
      'ranking' : null
    };
    this.sb_appearances = {
      'value' : _arg.sb_appearances,
      'ranking' : null
    };
    this.total_offense = {
      'value' : _arg.total_offense,
      'ranking' : null
    };
    this.turnovers = {
      'value' : _arg.turnovers,
      'ranking' : null
    };
    this.reg_season_win_percentage = {
      'value' : _arg.reg_season_win_percentage,
      'ranking' : null
    };
    this.wins = {
      'value' : _arg.wins,
      'ranking' : null
    };
    this.total_regular_season_tds = {
      'value' : _arg.total_regular_season_tds,
      'ranking' : null
    };
    this.playoff_win_percentage = {
      'value' : _arg.playoff_win_percentage,
      'ranking' : null
    };
    this.total_playoff_games = {
      'value' : _arg.total_playoff_games,
      'ranking' : null
    };
    this.yards_per_game = {
      'value' : _arg.yards_per_game,
      'ranking' : null
    };
    this.qb_rating = {
      'value' : _arg.qb_rating,
      'ranking' : null
    };
    this.total_mvp_awards = {
      'value' : _arg.total_mvp_awards,
      'ranking' : null
    };
    this.overall = null;
  };
  Qb.prototype.determine_score = function () {
  };

  var _toggleRanked = function () {
    ranked = !ranked;
  };
  var _resetQbRanking = function () {
    ranked = false;
  };
  var _qbsRanked = function () {
    ranked = true;
  };
  var _rankQbs = function () {
    var sb_titles_array = [];
    var sb_appearances_array = [];
    var total_offense_array = [];
    var turnovers_array = [];
    var reg_season_win_percentage_array = [];
    var wins_array = [];
    var total_regular_season_tds_array = [];
    var playoff_win_percentage_array = [];
    var total_playoff_games_array = [];
    var yards_per_game_array = [];
    var qb_rating_array = [];
    var total_mvp_awards_array = [];

    for (i = 0; i < qbs.length; i++) {
      sb_titles_array.push(qbs[i].sb_titles.value);
      sb_appearances_array.push(qbs[i].sb_appearances.value);
      total_offense_array.push(qbs[i].total_offense.value);
      turnovers_array.push(qbs[i].turnovers.value);
      reg_season_win_percentage_array.push(qbs[i].reg_season_win_percentage.value);
      wins_array.push(qbs[i].wins.value);
      total_regular_season_tds_array.push(qbs[i].total_regular_season_tds.value);
      playoff_win_percentage_array.push(qbs[i].playoff_win_percentage.value);
      total_playoff_games_array.push(qbs[i].total_playoff_games.value);
      yards_per_game_array.push(qbs[i].yards_per_game.value);
      qb_rating_array.push(qbs[i].qb_rating.value);
      total_mvp_awards_array.push(qbs[i].total_mvp_awards.value);
    }

    var _addQb = function(_qb) {
      var qb = new Qb(_qb);
      qbs.push(qb);
      _resetQbRanking();
    };

  };

  // public stuffs
  return {
    addQb : function (_data) {
      if (typeof _data === "array") {
        for (var i = 0; i < _data.length; i++) {
          _addQb(_data[i]);
        }
      }
      else {
        _addQb(_data);
      }
    }
  };
}());
