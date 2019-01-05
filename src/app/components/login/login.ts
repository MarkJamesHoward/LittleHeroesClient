import "@polymer/paper-button";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DNS, dev } from "../debug";

@inject(Router)
export class login {
  private username: string;
  private password: string;
  private router: Router;

  constructor(Router: Router) {
    this.router = Router;
  }

  Login() {
    // console.log(`username: ${this.username}`)
    // console.log(`password: ${this.password}`)
    let details = { email: "mark@mjhoward.co.uk", password: "TennisMauser1@" };
    console.log(details);
    fetch(`${DNS}/api/auth/login`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "include",
      body: JSON.stringify(details)
    })
      .then(response => {
        if (response.ok) {
          console.log(`login succeeded! - should have a cookie now:`);
          console.log(response);
          //Now let's navigate to the view of hereos
          this.router.navigate("children");
        } else {
          console.log("response was not ok");
        }
      })
      .catch(e => {
        console.log("failed to login");
      });
  }
}
