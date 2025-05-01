export const environment : { authSource: string; matchSource: string;tournamentSource:string } = {


  authSource: (window as any).env?.authSource || "defaultauthSource",
  matchSource: (window as any).env?.matchSource || "defaultmatchSource",
  tournamentSource: (window as any).env?.tournamentSource || "defaultTournamentSource",




};
