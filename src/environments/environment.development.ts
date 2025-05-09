export const environment : { authSource: string; matchSource: string;tournamentSource: string;userSource:string; statsSource:string } = {


  authSource: (window as any).env?.authSource || "https://cybersport-tournament-analyzer-auth-service-cb72.twc1.net",
  matchSource: (window as any).env?.matchSource || "http://77.221.158.197:8081",
  tournamentSource: (window as any).env?.tournamentSource || "http://77.221.158.197:8082",
  userSource: (window as any).env?.userSource ||  "http://77.221.158.197:8080",
  statsSource:(window as any).env?.statsSource ||  "http://176.98.178.99:8083",



};
