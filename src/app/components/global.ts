import { BrowniePoints } from './../library/interfaces';
//let DNS: string = "https://dojopointstest.azurewebsites.net";
let DNS: string = "http://localhost:53067";
let dev: boolean = true;

interface LoadData {
  firstLoad;
}

let FirstLoadOData: LoadData = { firstLoad: true };

let globalBrowniePoints:  Array<BrowniePoints>;

function GetBrowniePoints() {
  return globalBrowniePoints;
}

function 
SetBrowniePoints(bp) {
  globalBrowniePoints = bp;  
}

export { DNS, dev, FirstLoadOData , GetBrowniePoints, SetBrowniePoints};
