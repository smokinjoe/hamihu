var app = (function () {
  // private stuffs
  var qbs = [];
  var qb_index = 0;
  var ranked = false;
  var Qb = function (_arg) {
    this.qb_name = _arg[0];
    this.sb_titles = _arg[1];
    this.sb_appearances = _arg[2];
    this.total_offense = _arg[3];
    this.turnovers = _arg[4];
    this.reg_season_win_percentage = _arg[5];
    this.wins = _arg[6];
    this.total_regular_season_tds = _arg[7];
    this.playoff_win_percentage = _arg[8];
    this.total_playoff_games = _arg[9];
    this.yards_per_game = _arg[10];
    this.qb_rating = _arg[11];
    this.total_mvp_awards = _arg[12];
    this.overall = null;
  };
  Qb.prototype.determine_score = function () {
  };

  var _toggleRanked = function () {
    ranked = !ranked;
  };
  var _qbsUnranked = function () {
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
      sb_titles_array.push(qbs[i].sb_titles);
      sb_appearances_array.push(qbs[i].sb_appearances);
      total_offense_array.push(qbs[i].total_offense);
      turnovers_array.push(qbs[i].turnovers);
      reg_season_win_percentage_array.push(qbs[i].reg_season_win_percentage);
      wins_array.push(qbs[i].wins);
      total_regular_season_tds_array.push(qbs[i].total_regular_season_tds);
      playoff_win_percentage_array.push(qbs[i].playoff_win_percentage);
      total_playoff_games_array.push(qbs[i].total_playoff_games);
      yards_per_game_array.push(qbs[i].yards_per_game);
      qb_rating_array.push(qbs[i].qb_rating);
      total_mvp_awards_array.push(qbs[i].total_mvp_awards);
    }

    
  };

  // public stuffs
  return {
    addQb : function (_arg) {
      if (typeof _arg === "array") {
        for (var i = 0; i < _arg.length; i++) {
          qbs.push(_arg[i]);
        }
      }
      else {
        qbs.push(_arg);
      }
      _qbsUnranked();
    }
  };
}());
