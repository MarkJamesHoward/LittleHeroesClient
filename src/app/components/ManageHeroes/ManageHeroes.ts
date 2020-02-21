import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import {
  Parent,
  SignedIn,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import {
  DNS,
  dev,
  GetAccessToken,
  isAuthenticated,
  token,
  ConfigureClient
} from "../global";
import "@polymer/paper-button";
import "@polymer/paper-input/paper-input.js";

@inject(Router)
export class ManageHeroes {
  router: Router;
  parent: Parent;
  registeredKids: Array<BrowniePoints>;
  newChildName: string;
  addingChildActivated: boolean = false;
  groupMembers: Array<Parent>;
  loading: boolean = false;
  newUserInviteEmailAddress: string;
  displayError: boolean = false;
  errorMessage: string;
  attemptingDelete: boolean = false;

  Home() {
    this.router.navigate("/welcome");
  }

  async activate() {
    await GetAccessToken();

    console.log(token)

    fetch(`${DNS}/api/Children/all`, {
      method: "get",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json() as Promise<BrowniePoints[]>)
      .then(data => {
        this.registeredKids = data;
        console.log(data);
      });

  }

  async RemoveChild(child: BrowniePoints) {
    if (this.registeredKids.length > 1) {
      for (var i = 0; i < this.registeredKids.length; i++) {
        console.log(`checking ${i}`);
        if (child.id === this.registeredKids[i].id) {
          this.registeredKids.splice(i, 1);
          console.log(`removed ${i}`);
        }
      }
    }
    console.dir(child);
    this.attemptingDelete = true;
    try {
      var result = await fetch(`${DNS}/api/Children/${child.id}`, {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (result.ok) {
        var data = await result.json();
        this.attemptingDelete = false;
        //this.registeredKids = data;
        console.log("child removed successfully");
      } else {
        this.attemptingDelete = false;
        this.errorMessage = "Failed to remove child " + (await result.text());
        this.displayError = true;
        setTimeout(() => {
          this.attemptingDelete = false;
          this.displayError = false;
        }, 10000);
      }
    } catch (e) {
      this.attemptingDelete = false;
      this.errorMessage = "Failed to remove child " + e;
      this.displayError = true;
      setTimeout(() => {
        this.attemptingDelete = false;
        this.displayError = false;
      }, 5000);
    }
  }

  ActivateAddChild() {
    this.addingChildActivated = true;
    setTimeout(() => {
      let box = document.querySelector("#InputBox");
      console.log(box);
      //@ts-ignore
      box.focus();
    }, 5);
  }

  Cancel() {
    this.addingChildActivated = false;
  }

  CloseError() {
    this.displayError = false;
  }

  async AddChild() {
    this.loading = true;

    let username = document.querySelector("#InputBox");

    //@ts-ignore
    this.newChildName = username.value;

    console.log("adding new child " + this.newChildName);

    try {
      if (this.newChildName.length < 3) {
        this.displayError = true;
        this.errorMessage = "Name must be greater than 3 characters";
        this.loading = false;
      } else {
        GetAccessToken();

        var result = await fetch(`${DNS}/api/Children/${this.newChildName}`, {
          method: "post",
          headers: {
            authorization: `Bearer ${token}`
          }
        });
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

  constructor(router: Router) {
    this.router = router;
  }
}
