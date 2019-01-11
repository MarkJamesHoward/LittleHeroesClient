let DNS: string = "https://dojopoints.azurewebsites.net";
//let DNS: string = "http://localhost:53067";
let dev: boolean = false;

interface LoadData {
  firstLoad;
}

let FirstLoadOData: LoadData = { firstLoad: true };

export { DNS, dev, FirstLoadOData };
