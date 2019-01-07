import { data } from "./../devdata/childrendata";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import {
  Parent,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import { Router } from "aurelia-router";
import "@polymer/paper-button";
import "monster-creator";
import { DNS, dev } from "../global";

@inject(HttpClient, Router)
export class Pet {
  router: Router;
  http: HttpClient;
  child: BrowniePoints;
  childID: number;

  HandledCharacterChange(e: any) {
    console.log("handled" + e.detail.kicked);
  }

  async GetChild(childID: number) {
    console.log(`${DNS}/api/Children/GetChild/${childID}`);
    if (dev) {
      this.child = {
        id: 3,
        presenting: false,
        removeForAnimation: false,
        avatar: "53222aba52433ceaa5bb0e26aa761a82.png",
        childName: "bubby",
        points: 50,
        pendingAdds: 0,
        level: 23,
        pointsNeeded: 100,
        reward: "Forever computers",
        availableRewards: [
          {
            id: 223,
            browniePointsID: 3,
            reward: "Forever computers",
            used: false,
            beingConsumed: false
          }
        ],
        pet: {
          id: 1,
          eyes: 2,
          mouth: 2,
          silhouette: 3,
          selectedeyex: 47,
          selectedeyey: 27,
          selectedmouthx: 47,
          selectedmouthy: 82
        }
      };
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
    this.childID = params.id;
    this.GetChild(this.childID);
  }

  constructor(http: any, Router: Router) {
    this.http = http;
    this.router = Router;
  }
}
