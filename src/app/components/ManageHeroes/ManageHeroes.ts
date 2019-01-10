import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import {
  Parent,
  SignedIn,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import { DNS, dev } from "../global";
import "@polymer/paper-button";

@inject(Router, HttpClient)
export class ManageHeroes {
  router: Router;
  http: HttpClient;
  parent: Parent;
  registeredKids: Array<BrowniePoints>;
  newChildName: string;
  addingChildActivated: boolean = false;
  groupMembers: Array<Parent>;
  loading: boolean = false;
  newUserInviteEmailAddress: string;
  displayError: boolean = false;
  errorMessage: string;

  Home() {
    this.router.navigate("welcome/childrenpage");
  }

  async RemoveChild(child: BrowniePoints) {
    console.dir(child);
    try {
      var result = await this.http.fetch(`${DNS}/api/Children/${child.id}`, {
        method: "delete",
        credentials: "include"
      });
      if (result.ok) {
        var data = await result.json();
        this.registeredKids = data;
        console.log("child removed successfully");
      } else {
        this.errorMessage = "Failed to add child " + result.status;
        this.displayError = true;
      }
    } catch (e) {
      this.errorMessage = "Failed to add child " + e;
      this.displayError = true;
    }
  }

  ActivateAddChild() {
    this.addingChildActivated = true;
  }

  Cancel() {
    this.addingChildActivated = false;
  }

  CloseError() {
    this.displayError = false;
  }

  async AddChild() {
    this.loading = true;

    console.log("adding new child " + this.newChildName);

    try {
      if (this.newChildName.length < 3) {
        this.displayError = true;
        this.errorMessage = "Name must be greater than 3 characters";
        this.loading = false;
      } else {
        var result = await this.http.fetch(
          `${DNS}/api/Children/${this.newChildName}`,
          { method: "post", credentials: "include" }
        );
        if (result.ok) {
          var data = await result.json();
          this.registeredKids = data;
          console.log("new child added " + data);
        } else {
          this.errorMessage = "Failed to add child " + result.statusText;
          this.displayError = true;
        }
        this.addingChildActivated = false;
        this.loading = false;
      }
    } catch (e) {
      this.errorMessage = "Failed to add child " + e;
      this.displayError = true;
      this.loading = false;
    }
  }

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;

    http
      .fetch(`${DNS}/api/Children/all`, {
        method: "get",
        credentials: "include"
      })
      .then(result => result.json() as Promise<BrowniePoints[]>)
      .then(data => {
        this.registeredKids = data;
        console.log(data);
      });
  }
}
