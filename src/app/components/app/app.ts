import { Aurelia, PLATFORM, inject } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import { dev, DNS } from "../global";

interface SignedIn {
  signedIn: boolean;
  signedInAs: string;
}

@inject(HttpClient)
export class App {
  router: Router;
  public signedIn: boolean = false;
  public signedInAs: string;
  http: HttpClient;
  auth0: any;


  constructor(http: HttpClient) {
    this.http = http;


    if (dev) {
      this.signedIn = true;
    } else {
      this.signedIn = true;
    }
  }

  Logout() {
    this.http
      .fetch("/Account/Logout", { method: "post", credentials: "same-origin" })
      .then(result => result)
      .then(data => {
        console.log(data);
        this.signedIn = false;
        this.signedInAs = "";
      });
  }

  Login() {
    window.location.href = "/Account/Login";
  }

  Register() {
    window.location.href = "/Account/Register";
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "LittleHeroes";
    config.options.pushState = true;
    config.options.hashChange = false;
    config.options.root = "/";
    config.map([
      {
        route: ["login"],
        name: "login",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../login/login"),
        nav: true,
        title: "Login"
      },
      {
        route: ["", "welcome"],
        name: "welcome",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../welcome/welcome"),
        nav: true,
        title: "Welcome"
      },
      {
        route: ["children/:id/:scrollPos"],
        name: "children",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../children/children"),
        nav: false,
        title: "Heroes"
      },
      {
        route: ["ManageHeroes"],
        name: "ManageHeroes",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../ManageHeroes/ManageHeroes"),
        nav: true,
        title: "Manage Heroes"
      },
      {
        route: ["ManageParents"],
        name: "ManageParents",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../ManageParents/ManageParents"),
        nav: true,
        title: "Manage Parents"
      },
      {
        route: "pet/:id/:scrollPos",
        name: "pet",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../pet/pet"),
        nav: false,
        title: "Select Pet"
      },
      {
        route: ["notifications"],
        name: "notifications",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../notifications/notifications"),
        nav: true,
        title: "Receive Notifications"
      },
      {
        route: ["register"],
        name: "register",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../register/register"),
        nav: true,
        title: "Register"
      },
      {
        route: ["quickstart"],
        name: "quickstart",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../quickstart/quickstart"),
        nav: true,
        title: "QuickStart"
      },
      {
        route: ["achievements/:id/:scrollPos"],
        name: "achievements",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../achievements/achievements"),
        nav: false,
        title: "Achievements"
      },
      {
        route: ["unlock/:level/:scrollPos"],
        name: "unlock",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../unlock/unlock"),
        nav: false,
        title: "Unlock"
      },
      {
        route: ["levelup/:id/:scrollPos"],
        name: "levelup",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../levelup/levelup"),
        nav: false,
        title: "LevelUp"
      },
      {
        route: ["privacy"],
        name: "privacy",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../privacy/privacy"),
        nav: false,
        title: "privacy"
      }
    ]);

    this.router = router;
  }
}
