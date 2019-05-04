import { HttpClient } from 'aurelia-fetch-client';
import "@polymer/paper-button";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DNS, dev } from "../global";

@inject(Router, HttpClient)
export class Register {
  router: Router;
  addedNewUserOk: boolean = false;
  attemptedAddNewUser: boolean = false;
  error: boolean = false;
  http: HttpClient;
  private myusername: string;
  private mypassword: string;

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }

  Home() {
    this.router.navigate("welcome");
  }

  Register() {
    let details = { email: this.myusername, password: this.mypassword };
    this.attemptedAddNewUser = false;

    console.log(DNS);

    fetch(`${DNS}/api/auth/register`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "include",
      body: JSON.stringify(details)
    })
      .then(response => {
        if (response.ok) {
          console.log("added new user successfully!");
          this.addedNewUserOk = true;
          this.attemptedAddNewUser = false;
          setTimeout(() => { 
            this.router.navigate('/welcome')
          }, 1000)
        }
        else {
          this.error = true;
          setTimeout(() => { 
            this.error = false;
          }, 3000)
        }
      })
      .catch(e => {
        this.attemptedAddNewUser = true;
        this.error = true;
        setTimeout(() => { 
          this.error = false;
        }, 3000)
        console.log("error adding new user");
      });
  }
}
