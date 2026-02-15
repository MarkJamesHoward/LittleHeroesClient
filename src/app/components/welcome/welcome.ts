import { resolve } from '@aurelia/kernel';
import { IRouter } from '@aurelia/router-lite';
import { SignedIn, Parent } from "../../library/interfaces";
import {
  DNS,
  dev,
  FirstLoadOData,
  ConfigureClient,
  GetAccessToken,
  token,
  GlobalLogout,
  GlobalLogin,
  auth0,
  username,
  CheckIfAuthenticated
} from "../global";
import "LittleHeroesHomePageAnimation";

export class Welcome {
  private showFCA: boolean = false;
  private observer: IntersectionObserver;
  private proceedToChildrenScreen: boolean = true;
  private router = resolve(IRouter);
  public isLoading: boolean = true;
  public signedIn: boolean = false;
  public signedInAs: string;
  public newUserInviteEmailAddress: string;
  public parent: Parent;
  public groupMembers: Array<Parent>;
  public offline: boolean = false;
  public errorMessage: string;
  public errorHadOccurred: boolean = false;

  async Login() {
    await GlobalLogin();
  }

  async Logout() {
    await GlobalLogout();
  }

  public async AmISignedIn() {
    if (await CheckIfAuthenticated()) {
      this.signedIn = true;
      this.isLoading = false;

      let user = await auth0.getUser();
      this.signedInAs = user.name;

      if (this.proceedToChildrenScreen) {
        //this.router.load("children/0/0");
      } else {
        //this.GetUsername();
      }
    } else {
      console.log("@## show that we are not logged in");
      this.signedIn = false;
      this.isLoading = false;

      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        await auth0.handleRedirectCallback();

        console.log("*** Showing the logged in user detils ***");

        this.signedIn = true;
        this.isLoading = false;
        this.offline = false;

        let user = await auth0.getUser();
        this.signedInAs = user.name;

        await GetAccessToken();
        console.log("token", token);

        //updateUI();
        console.log("*** cleaning code and state from query string ***");

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
      }
    }
  }

  ManageHeroes() {
    this.router.load("ManageHeroes");
  }

  Privacy() {
    this.router.load("privacy");
  }

  ManageNotifications() {
    this.router.load("notifications");
  }

  QuickStart() {
    this.router.load("quickstart");
  }

  offlineHandler() {
    console.log("offline now!");
    this.offline = true;
  }
  onlineHandler() {
    console.log("online now!");
    this.offline = false;
  }

  constructor() {
    window.addEventListener("offline", this.offlineHandler.bind(this));
    window.addEventListener("online", this.onlineHandler.bind(this));
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
    this.router.load("children/0/0");
  }

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

  async loading(params: any) {
    await ConfigureClient();

    this.AmISignedIn()
      .then(() => {
        if (this.signedIn) {
          // this.startup();
        }
        console.log("finished constructor");
        // this.isLoading = false;
      })
      .catch(err => {
        if (err == "TypeError: Failed to fetch") {
          console.log("Offline " + err);
          this.offline = true;
          this.isLoading = false;
        } else {
          console.log("Some error " + err);
          this.errorHadOccurred = true;
          this.errorMessage = err;
          this.isLoading = false;
        }
      });

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
