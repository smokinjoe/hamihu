var app = (function () {
  var qbs = [];
  var qb_index = 0;
  var Qb = function (_arg) {
    this.qb_name = _arg[0];
    this.sb_titles = _arg[0];
    this.sb_appearances = _arg[1];
    this.total_offense = _arg[2];
    this.turnovers = _arg[3];
    this.reg_season_win_percentage = _arg[4];
    this.wins = _arg[5];
    this.total_regular_season_tds = _arg[6];
    this.playoff_win_percentage = _arg[7];
    this.total_playoff_games = _arg[8];
    this.yards_per_game = _arg[9];
    this.qb_rating = _arg[10];
    this.total_mvp_awards = _arg[11];
    this.overall = null;
  };
  Qb.prototype.determine_score = function () {
    
  };

  return {
    addQb : function (_arg) {
      if (typeof _arg === "array") {
        for (var i = 0; i < _arg.length; i++) {
          qbs[qb_index++] = _arg[i];
        }
      }
      else {
        qbs[_qb_index++] = _arg;
      }
    }
  };
}());
