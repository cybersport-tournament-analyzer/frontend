export const environment : { authSource: string; matchSource: string } = {

  authSource: (window as any).env?.authSource || "defaultauthSource",
  matchSource: (window as any).env?.matchSource || "defaultmatchSource",


};
