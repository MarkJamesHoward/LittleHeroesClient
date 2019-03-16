import "@polymer/paper-progress/paper-progress.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import "@polymer/paper-button";

@inject(Router)
export class Unlock {
  router: Router;

  UnlockEyes1 = 1; 
  UnlockEyes2 = 5;
  UnlockEyes3 = 11;
  UnlockEyes4 = 18;

  UnlockEyes1Visible = false;
  UnlockEyes2Visible = false;
  UnlockEyes3Visible = false;
  UnlockEyes4Visible = false;


  UnlockMouth1 = 2;
  UnlockMouth2 = 7;
  UnlockMouth3 = 13;
  UnlockMouth4 = 21;

  UnlockMouth1Visible = false;
  UnlockMouth2Visible = false;
  UnlockMouth3Visible = false;
  UnlockMouth4Visible = false;


  UnlockLegs1 = 3;
  UnlockLegs2 = 9;
  UnlockLegs3 = 15;
  UnlockLegs4 = 24;

  UnlockLegs1Visible = false;
  UnlockLegs2Visible = false;
  UnlockLegs3Visible = false;
  UnlockLegs4Visible = false;


  level: number = 0;

  Continue() {
    this.router.navigate("/children/0");
  }

  activate(params: any) {

    let foundOne = false;
    
    console.log(params.level)
    if (params.level == this.UnlockEyes1) {
      this.UnlockEyes1Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockEyes2) {
      this.UnlockEyes2Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockEyes3) {
      this.UnlockEyes3Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockEyes4) {
      this.UnlockEyes4Visible = true;
      foundOne = true;
    }

    if (params.level == this.UnlockMouth1) {
      this.UnlockMouth1Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockMouth2) {
      this.UnlockMouth2Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockMouth3) {
      this.UnlockMouth3Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockMouth4) {
      this.UnlockMouth4Visible = true;
      foundOne = true;
    }


    if (params.level == this.UnlockLegs1) {
      this.UnlockLegs1Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockLegs2) {
      this.UnlockLegs2Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockLegs4) {
      this.UnlockLegs3Visible = true;
      foundOne = true;
    }
    if (params.level == this.UnlockLegs2) {
      this.UnlockLegs4Visible = true;
      foundOne = true;
    }

    if (!foundOne) {
      this.Continue();
    }
  }


  constructor(router: Router) {
    this.router = router;
  }
}
