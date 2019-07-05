import { MetadataType } from 'aurelia-metadata';
import { HttpClient } from "aurelia-fetch-client";
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
  DelayInCreationOfAccount: boolean;
  router: Router;
  addedNewUserOk: boolean = false;
  attemptedAddNewUser: boolean = false;
  connecting: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  http: HttpClient;
  myusername: string;
  mypassword: string;

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }

  Home() {
    this.router.navigate("welcome");
  }

  AllGood() {
    setTimeout(() => {
      this.addedNewUserOk = true;
      this.attemptedAddNewUser = false;
      this.connecting = false;

      setTimeout(() => {
      this.router.navigate("/welcome");
      }, 3000);

    }, 2000);
  }

  Register() {

    let user = document.querySelector('#username');
    //@ts-ignore
    this.myusername = user.value;

    let pass = document.querySelector('#password')
    //@ts-ignore
    this.mypassword = pass.value;

    let details = { email: this.myusername, password: this.mypassword };
    this.attemptedAddNewUser = false;

    console.log(DNS);

    this.connecting = true;

    setTimeout(() => {
      this.DelayInCreationOfAccount = true;
    }, 2000);

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
          this.AllGood();
        } else {
          this.connecting = false;
          this.error = true;
          this.attemptedAddNewUser = true;
          response.text().then((data) => {
            this.errorMsg = data;
          });
        }
      })
      .catch(e => {
        this.attemptedAddNewUser = true;
        this.error = true;
        this.connecting = false;
        this.errorMsg = e.message;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.log("error adding new user");
      });
  }
}
