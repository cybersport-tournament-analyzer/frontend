(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["authSource"] = "${API_AUTH_URL}";
  window["env"]["matchSource"] = "${API_MATCHMAKING_URL}";
  window["env"]["tournamentSource"] = "${API_TOURNAMENT_URL}";



})(this);
