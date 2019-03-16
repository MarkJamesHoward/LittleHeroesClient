import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { SignedIn, Parent } from "../../library/interfaces";
import "@polymer/paper-button";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import { DNS, dev, FirstLoadOData } from "../global";

@inject(HttpClient, Router)
export class Welcome {
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

  public async AmISignedIn() {
    if (dev) {
        this.signedIn = true;
        this.signedInAs = 'DEV'
        this.username = 'DEV'
        this.offline = false;
        this.loading = false;
        return true;
      }

    fetch(`${DNS}/api/children/all`, {
      method: "get",
      credentials: "include"
    })
      .then(response => {
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
        } else {
          console.log(
            "Not logged in - should see a 401 not auth on the get children call"
          );
          this.signedIn = false;
          this.offline = false;
          this.loading = false;
        }
      })
      .catch(e => {
        console.log("failed to login");
        this.offline = true;
        this.loading = false;
        this.signedIn = false;
      });
  }

  ManageHeroes() {
    this.router.navigate("ManageHeroes");
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
    console.log('offline now!')
    this.offline = true;
  }
  onlineHandler() {
    console.log('online now!')
    this.offline = false;
  }

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;

    
    window.addEventListener('offline', this.offlineHandler.bind(this))
    window.addEventListener('online', this.onlineHandler.bind(this))

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
    this.router.navigate("children/1");
  }

  Login() {
    this.router.navigate("Login");
  }

  Logout() {
    fetch(`${DNS}/api/auth/logout`, {
      method: "get",
      credentials: "include"
    }).then(response => {
      if (response.ok) {
        console.log("logged out");
        this.AmISignedIn();
      }
    });
  }

  activate(params: any) {
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

  // Signup() {
  //   try {
  //     console.log("navigate to login");
  //     window.location.href = `${DNS}/Account/Login`;
  //   } catch (err) {
  //     if (err == "TypeError: Failed to fetch") {
  //       console.log("Offline " + err);
  //       this.offline = true;
  //       this.loading = false;
  //     } else {
  //       console.log("Some error " + err);
  //       this.errorHadOccurred = true;
  //       this.errorMessage = err;
  //       this.loading = false;
  //     }
  //   }
  // }
}
