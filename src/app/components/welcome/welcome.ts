import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { SignedIn, Parent } from "../../library/interfaces";
import "@polymer/paper-button";
import "@polymer/app-layout/app-layout.js";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";

@inject(HttpClient, Router)
export class Welcome {
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
  public dev: boolean = false;
  private DNS: string = "https://littleheroes.azurewebsites.net";

  public async AmISignedIn() {
    if (this.dev) return true;

    var result = await this.http.fetch(`${this.DNS}/Account/AmISignedIn`, {
      method: "get",
      credentials: "same-origin"
    });
    if (result.ok == true) {
      var data = await result.json();
      this.signedIn = data.signedIn;
      this.signedInAs = data.signedInAs;
    }
  }

  public async GetParentDetails() {
    var result = await this.http.fetch(
      `${this.DNS}/api/Parents/GetParentDetails`,
      {
        method: "get",
        credentials: "same-origin"
      }
    );
    if (result.status == 200) {
      var data = await result.json();
      this.parent = data;
    }
  }

  public async GetGroupDetails() {
    var result = await this.http.fetch(`${this.DNS}/api/Group`, {
      method: "get",
      credentials: "same-origin"
    });
    if (result.status == 200) {
      var data = await result.json();
      this.groupMembers = data;
    }
  }

  public async CheckOnlineOrNot() {
    try {
      await this.AmISignedIn();
      this.offline = false;
    } catch (e) {
      this.offline = true;
    }
  }

  public async startup() {
    let [await1, await2] = await Promise.all([
      this.GetParentDetails(),
      this.GetGroupDetails()
    ]);
    this.loading = false;
  }

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;

    this.AmISignedIn()
      .then(() => {
        if (this.signedIn) {
          this.startup();
        }
        console.log("finished constructor");
        this.loading = false;
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

  ViewHeroTastic() {
    this.router.navigate("children");
  }

  DevSignup() {
    try {
      console.log("navigate to login");
      window.location.href = `${this.DNS}/Account/DevLogin`;
    } catch (err) {
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
    }
  }

  Signup() {
    try {
      console.log("navigate to login");
      window.location.href = `${this.DNS}/Account/Login`;
    } catch (err) {
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
    }
  }
}
