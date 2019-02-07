import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import "@polymer/paper-button";

@inject(Router)
export class QuickStart {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  Start() {
    this.router.navigate("children");
  }

  Home() {
    this.router.navigate("welcome");
  }

  // TODO:This needs to be completed
  // RegisterAsGuest() {
  //   let details = { email: this.myusername, password: this.mypassword };
  //   this.attemptedAddNewUser = false;

  //   fetch(`${DNS}/api/auth/register`, {
  //     method: "post",
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     }),
  //     credentials: "include",
  //     body: JSON.stringify(details)
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         console.log("added new user successfully!");
  //         this.addedNewUserOk = true;
  //         this.attemptedAddNewUser = false;
  //       }
  //     })
  //     .catch(e => {
  //       this.attemptedAddNewUser = true;
  //       console.log("error adding new user");
  //     });
  // }
}
