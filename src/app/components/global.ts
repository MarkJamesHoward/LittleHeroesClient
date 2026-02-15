import { BrowniePoints } from "../library/interfaces";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import auth_config from "./auth_config.json";

let DNS: string = "https://littleheroesapi.azurewebsites.net";
let dev: boolean = false;
let token: string = "";
let auth0: any;
let isAuthenticated: boolean = false;
let username: string = "";

interface LoadData {
  firstLoad: boolean;
}

async function GlobalLogout() {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}

async function CheckIfAuthenticated() {
  return await auth0.isAuthenticated();
}

async function GlobalLogin() {
  console.log("attempting login");

  await auth0.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });

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
    clientId: auth_config.clientId,
    authorizationParams: {
      audience: auth_config.audience,
    },
  });
  console.log("Completed Configure Client");
}

let FirstLoadOData: LoadData = { firstLoad: true };

let globalBrowniePoints: Array<BrowniePoints>;

function GetBrowniePoints() {
  return globalBrowniePoints;
}

function SetBrowniePoints(bp: Array<BrowniePoints>) {
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
  CheckIfAuthenticated,
};
