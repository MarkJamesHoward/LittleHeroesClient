import { data } from "./../devdata/childrendata";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import {FindAchievement} from '../../library/AchievementsCommon'
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
      this.child = this.browniePoints.find(item => item.id === childID);
      console.log(`Child is now ${this.child}`);
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

  Reset() {
    let node = document.querySelector("monster-creator");
    //@ts-ignore
    node.Reset();
  }

  Cancel() {
    this.router.navigate("children");
  }

  SavePet(
    childID: number,
    eyes: number,
    mouth: number,
    legs: number,
    silhouette: number,
    selectedmouthx: number,
    selectedmouthy: number,
    selectedeyex: number,
    selectedeyey: number,
    selectedlegsx: number,
    selectedlegsy: number
  ) {

      this.child.pet.eyes = eyes;
      this.child.pet.mouth = mouth;
      this.child.pet.legs = legs;
      this.child.pet.silhouette = silhouette;
      this.child.pet.selectedmouthx = selectedmouthx;
      this.child.pet.selectedmouthy = selectedmouthy;
      this.child.pet.selectedeyex = selectedeyex;
      this.child.pet.selectedeyey = selectedeyey;
      this.child.pet.selectedlegsx = selectedlegsx;
      this.child.pet.selectedlegsy = selectedlegsy;
      SetBrowniePoints(this.browniePoints);
      // console.log(
      //   `${DNS}/api/Pet/CustomizePet/${childID}/${eyes}/${mouth}/${legs}/${silhouette}/${selectedmouthx}/${selectedmouthy}/${selectedeyex}/${selectedeyey}/${selectedlegsx}/${selectedlegsy}`
      // );
      //var result = await 
      this.http.fetch(
        `${DNS}/api/Pet/CustomizePet/${childID}/${eyes}/${mouth}/${legs}/${silhouette}/${selectedmouthx}/${selectedmouthy}/${selectedeyex}/${selectedeyey}/${selectedlegsx}/${selectedlegsy}`,
        { method: "put", credentials: "include" }
      );
      //var data = await result.json();
      //console.log(data);

    this.router.navigate(`children/0`);
  }

  activate(params: any) {
    console.log(`loading pety for ${params.id}`);
    this.browniePoints = GetBrowniePoints();

    if (!this.browniePoints) {
      import("../devdata/childrendata").then(data => {
        SetBrowniePoints(data.data);
        this.browniePoints = GetBrowniePoints();
        this.child = this.browniePoints.find(item => item.id == params.id);
        this.CheckForMakeAMonster();
      });
    } else {
      console.log(this.browniePoints);
      this.child = this.browniePoints.find(item => item.id == params.id);
      console.log(this.child);
      this.CheckForMakeAMonster();
    }
  }

  async CheckForMakeAMonster() {
    if (dev) {
      let MonsterAchievement = await FindAchievement(this.child, "Make a Monster", dev, DNS)
      MonsterAchievement.progress = 100;
    }
    else {
     // Update the Make a Monster achievement to completed
     try {
      let result = await fetch(`${DNS}/api/achievements/CheckForMakeAMonster/${this.child.id}`, {
        method: "Get",
        credentials: "include"
      });
      if (result.ok) {
        let MonsterAchievement = await FindAchievement(this.child, "Make a Monster", dev, DNS)
        MonsterAchievement.progress = 100;
        //TODO
      } else {
        //this.errorHadOccurred = true;
        //this.errorMessage = "Failed to update level to server..";
        //TODO
      }
    } catch (e) {
      //TODO
      //this.errorHadOccurred = true;
      //this.errorMessage = e;
    }
  }
  }

  constructor(http: any, Router: Router) {
    this.http = http;
    this.router = Router;
  }
}
