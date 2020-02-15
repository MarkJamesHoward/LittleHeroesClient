import { PLATFORM } from "aurelia-pal";
import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { SignedIn, Parent } from "../../library/interfaces";
import "@polymer/paper-button";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import { DNS, dev, FirstLoadOData } from "../global";
import "LittleHeroesHomePageAnimation";
import createAuth0Client from "@auth0/auth0-spa-js";
import * as auth_config from "./auth_config.json";

@inject(HttpClient, Router)
export class Welcome {
  private showFCA: boolean = false;
  private observer: IntersectionObserver;
  private username: string;
  private proceedToChildrenScreen: boolean = true;
  public http: HttpClient;
  public loading: boolean = true;
  public router: Router;
  public signedIn: boolean = false;
  public signedInAs: string;
  public newUserInviteEmailAddress: string;
  public parent: Parent;
  public groupMembers: Array<Parent>;
  public offline: boolean = false;
  public errorMessage: string;
  public errorHadOccurred: boolean = false;
  public auth0: any;
  public isAuthenticated: boolean = false;

  async ConfigureClient() {
    this.auth0 = await createAuth0Client({
      domain: auth_config.domain,
      client_id: auth_config.clientId,
      audience: auth_config.audience
    });
    console.log("Completed Configure Client");

    this.isAuthenticated = await this.auth0.isAuthenticated();
    console.log(this.isAuthenticated);
  }

  async Login() {
    console.log("attempting login");

    try {
      console.log("Logging in");

      this.auth0
        .loginWithRedirect({ redirect_uri: window.location.origin })
        .then(data => {
          this.auth0.getUser().then(name => {
            console.log("login call completed", name);
          });
        });
    } catch (err) {
      console.log("Log in failed", err);
    }
  }

  Logout() {
    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public async AmISignedIn() {
    if (!this.isAuthenticated) {
      this.signedIn = false;
      this.loading = false;
    }

    if (this.isAuthenticated) {
      this.signedIn = true;
      this.loading = false;
      this.signedInAs = await this.auth0.getUser();
      this.username = await this.auth0.getUser();

      // Get the access token from the Auth0 client
      const token = await this.auth0.getTokenSilently();

      console.log("token", token);

      fetch(`${DNS}/api/children/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "get"
      }).then(response => {
        if (response.ok) {
          this.signedIn = true;
          this.offline = false;
          this.loading = false;
          console.log(`We are logged in`);
          console.log(response);
          //Now let's navigate to the view of hereos
          if (this.proceedToChildrenScreen) {
            this.router.navigate("children/1");
          } else {
            this.GetUsername();
          }
        }
      });
    } else {
      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        await this.auth0.handleRedirectCallback();

        //updateUI();
        console.log("*** removing code ***");

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
      }
    }
  }

  ManageHeroes() {
    this.router.navigate("ManageHeroes");
  }

  Privacy() {
    this.router.navigate("privacy");
  }

  ManageNotifications() {
    this.router.navigate("notifications");
  }

  QuickStart() {
    this.router.navigate("QuickStart");
  }

  // public async GetParentDetails() {
  //   var result = await this.http.fetch(
  //     `${DNS}/api/Parents/GetParentDetails`,
  //     {
  //       method: "get",
  //       credentials: "same-origin"
  //     }
  //   );
  //   if (result.status == 200) {
  //     var data = await result.json();
  //     this.parent = data;
  //   }
  // }

  // public async GetGroupDetails() {
  //   var result = await this.http.fetch(`${DNS}/api/Group`, {
  //     method: "get",
  //     credentials: "same-origin"
  //   });
  //   if (result.status == 200) {
  //     var data = await result.json();
  //     this.groupMembers = data;
  //   }
  // }

  public async CheckOnlineOrNot() {
    try {
      await this.AmISignedIn();
      this.offline = false;
    } catch (e) {
      this.offline = true;
    }
  }

  // public async startup() {
  //   let [await1, await2] = await Promise.all([
  //     this.GetParentDetails(),
  //     this.GetGroupDetails()
  //   ]);
  //   this.loading = false;
  // }

  offlineHandler() {
    console.log("offline now!");
    this.offline = true;
  }
  onlineHandler() {
    console.log("online now!");
    this.offline = false;
  }

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;

    window.addEventListener("offline", this.offlineHandler.bind(this));
    window.addEventListener("online", this.onlineHandler.bind(this));

    this.ConfigureClient().then(() => {
      this.AmISignedIn()
        .then(() => {
          if (this.signedIn) {
            // this.startup();
          }
          console.log("finished constructor");
          // this.loading = false;
        })
        .catch(err => {
          if (err == "TypeError: Failed to fetch") {
            console.log("Offline " + err);
            this.offline = true;
            this.loading = false;
          } else {
            console.log("Some error " + err);
            this.errorHadOccurred = true;
            this.errorMessage = err;
            this.loading = false;
          }
        });
    });
  }

  public CloseError() {
    this.errorHadOccurred = false;
  }
  public DisplayError(msg: string) {
    this.errorMessage = msg;
    this.errorHadOccurred = true;
    console.log(msg);
  }

  async GetUsername() {
    var res = await fetch(`${DNS}/api/auth/getUsername`, {
      method: "get",
      credentials: "include"
    });
    if (res.ok) {
      let data: Parent = await res.json();
      this.username = data.email;
    }
  }

  ViewHeroTastic() {
    this.router.navigate("children/1/0");
  }

  // Logout() {
  //   if (dev) {
  //     window.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth"
  //     });
  //   }
  //   fetch(`${DNS}/api/auth/logout`, {
  //     method: "get",
  //     credentials: "include"
  //   }).then(response => {
  //     if (response.ok) {
  //       console.log("logged out");
  //       window.scrollTo({
  //         top: 0,
  //         left: 0,
  //         behavior: "smooth"
  //       });
  //       this.AmISignedIn();
  //     }
  //   });
  // }

  // Activate animations as the element comes into view
  async attached() {
    //@ts-ignore
    const myImg = this.FullyCustomisableMonsterTitle;

    this.observer = new IntersectionObserver((entry, observer) => {
      if (entry[0].intersectionRatio > 0) {
        //console.log("fully customisable text now IN view");
        this.showFCA = true;
      } else {
        //console.log("fully customisable view NOT in view");
        this.showFCA = false;
      }
    });

    this.observer.observe(myImg);
  }

  async activate(params: any) {
    console.log(`loading home page from ${params.id}`);
    if (FirstLoadOData.firstLoad) {
      console.log("do not navigate to the children screen");
      this.proceedToChildrenScreen = false;
      FirstLoadOData.firstLoad = false;
    } else {
      console.log("yep lets navigate");
      this.proceedToChildrenScreen = false;
    }
  }
}
