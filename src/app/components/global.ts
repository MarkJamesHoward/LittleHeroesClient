import { BrowniePoints } from "./../library/interfaces";
// let DNS: string = "https://dojopoints.azurewebsites.net";
//let DNS: string = "https://littleheroes-api.azurewebsites.net";
//let DNS: string = "https://api.littleheroes.online";
let DNS: string = "http://localhost:53067";
let dev: boolean = false;

interface LoadData {
  firstLoad;
}

let FirstLoadOData: LoadData = { firstLoad: true };

let globalBrowniePoints: Array<BrowniePoints>;

function GetBrowniePoints() {
  return globalBrowniePoints;
}

function SetBrowniePoints(bp) {
  globalBrowniePoints = bp;
}

export { DNS, dev, FirstLoadOData, GetBrowniePoints, SetBrowniePoints };
