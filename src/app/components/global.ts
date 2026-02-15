import { BrowniePoints } from "./../library/interfaces";
import createAuth0Client from "@auth0/auth0-spa-js";
import * as auth_config from "./auth_config.json";

// let DNS: string = "https://dojopoints.azurewebsites.net";
//let DNS: string = "https://littleheroes-api.azurewebsites.net";
//let DNS: string = "https://api.littleheroes.online";
let DNS: string = "https://littleheroesapi.azurewebsites.net";
let dev: boolean = false;
let token: string = "";
let auth0: any;
let isAuthenticated: boolean = false;
let username: string = "";

interface LoadData {
  firstLoad;
}

async function GlobalLogout() {
  auth0.logout({
    returnTo: window.location.origin
  });
}

async function CheckIfAuthenticated() {
  return await auth0.isAuthenticated();
}

async function GlobalLogin() {
  console.log("attempting login");

  await auth0.loginWithRedirect({ redirect_uri: window.location.origin });

  isAuthenticated = await auth0.isAuthenticated();
  console.log("Authenticated", isAuthenticated);

  let user = await auth0.getUser();
  username = user.name;
  console.log("USERNAME", username);

  await GetAccessToken();

  console.log("USER", user);
}

async function GetAccessToken() {
  if (auth0) {
    // Get the access token from the Auth0 client
    token = await auth0.getTokenSilently();
  } else {
    await ConfigureClient();
    token = await auth0.getTokenSilently();
  }
  console.log("token", token);
}

async function ConfigureClient() {
  auth0 = await createAuth0Client({
    domain: auth_config.domain,
    client_id: auth_config.clientId,
    audience: auth_config.audience
  });
  console.log("Completed Configure Client");
}

let FirstLoadOData: LoadData = { firstLoad: true };

let globalBrowniePoints: Array<BrowniePoints>;

function GetBrowniePoints() {
  return globalBrowniePoints;
}

function SetBrowniePoints(bp) {
  globalBrowniePoints = bp;
}

export {
  DNS,
  dev,
  FirstLoadOData,
  GetBrowniePoints,
  SetBrowniePoints,
  ConfigureClient,
  GetAccessToken,
  token,
  auth0,
  isAuthenticated,
  GlobalLogin,
  GlobalLogout,
  username,
  CheckIfAuthenticated
};
