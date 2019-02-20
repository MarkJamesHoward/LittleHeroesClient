import { data } from "./../devdata/childrendata";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import {
  Parent,
  BrowniePoints,
  IAvailableRewards,
  IMyAchievements
} from "../../library/interfaces";
import { Router } from "aurelia-router";
import "@polymer/paper-button";
import "monster-creator";
import { DNS, dev, GetBrowniePoints, SetBrowniePoints } from "../global";

@inject(HttpClient, Router)
export class Pet {
  router: Router;
  http: HttpClient;
  child: BrowniePoints;
  childID: number;
  browniePoints: Array<BrowniePoints>;

  HandledCharacterChange(e: any) {
    console.log("handled" + e.detail.kicked);
  }

  async GetChild(childID: number) {
    console.log(`${DNS}/api/Children/GetChild/${childID}`);
    if (dev) {
      this.browniePoints = GetBrowniePoints();
      this.child = this.browniePoints.find(item => item.id === childID)
      console.log(`Child is now ${this.child}`)
    } else {
      var result = await this.http.fetch(
        `${DNS}/api/Children/GetChild/${childID}`,
        {
          method: "get",
          credentials: "include"
        }
      );
      var data = await result.json();
      this.child = data;
      console.log(data);
    }
  }

  async SavePet(
    childID: number,
    eyes: number,
    mouth: number,
    silhouette: number,
    selectedmouthx: number,
    selectedmouthy: number,
    selectedeyex: number,
    selectedeyey: number
  ) {
    if (dev) {
      this.child.pet.eyes = eyes;
      this.child.pet.mouth = mouth;
      this.child.pet.silhouette = silhouette;
      this.child.pet.selectedmouthx = selectedmouthx;
      this.child.pet.selectedmouthy = selectedmouthy;
      this.child.pet.selectedeyex = selectedeyex;
      this.child.pet.selectedeyey = selectedeyey;
      SetBrowniePoints(this.browniePoints);

    } else {
      console.log(
        `${DNS}/api/Pet/CustomizePet/${childID}/${eyes}/${mouth}/${silhouette}/${selectedmouthx}/${selectedmouthy}/${selectedeyex}/${selectedeyey}`
      );
      var result = await this.http.fetch(
        `${DNS}/api/Pet/CustomizePet/${childID}/${eyes}/${mouth}/${silhouette}/${selectedmouthx}/${selectedmouthy}/${selectedeyex}/${selectedeyey}`,
        { method: "put", credentials: "include" }
      );
      var data = await result.json();
      console.log(data);
    }

    this.router.navigate("children");
  }

  activate(params: any) {
    console.log(`loading pet for ${params.id}`);
    console.log(params.id)
    //this.childID = params.id;
    //this.GetChild(this.childID);
    this.browniePoints = GetBrowniePoints();
    console.log(this.browniePoints)
    this.child = this.browniePoints.find(item => item.id == params.id);
    console.log(this.child)
  }

  constructor(http: any, Router: Router) {
    this.http = http;
    this.router = Router;
  }
}
