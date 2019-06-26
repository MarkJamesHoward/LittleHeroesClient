import { BrowniePoints } from "../../library/interfaces";
import { IAchievements, IMyAchievements } from "../../library/interfaces";
import "@polymer/paper-progress/paper-progress.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import { DNS, dev, GetBrowniePoints, SetBrowniePoints } from "../global";
import { data } from "../devdata/childrendata";
import "@polymer/paper-button";

@inject(Router, HttpClient)
export class Achievements {
  private achievements: Array<IAchievements>;
  private router: Router;
  private http: HttpClient;
  private browniePoints: Array<BrowniePoints>;
  private child: BrowniePoints;
  private TotalAchievementCount: number;
  scrollPos: number = 0;

  Back() {
    this.router.navigate(`/children/0/${this.scrollPos}`);
  }

  async activate(params: any) {
    this.scrollPos = params.scrollPos;

    console.log(`loading achievements for ${params.id}`);
    if (dev) {
      this.browniePoints = data;
      SetBrowniePoints(this.browniePoints);
    }
    this.browniePoints = GetBrowniePoints();

    if (!this.browniePoints) {
      let result = await this.http.fetch(`${DNS}/api/Children/all`, {
        method: "get",
        credentials: "include"
      });

      if (result.ok) {
        this.browniePoints = await result.json();
        SetBrowniePoints(this.browniePoints);
      } else {
        console.log("Unable to retrieve children");
      }
    }

    this.child = this.browniePoints.find(item => item.id == params.id);

    if (this.achievements) {
      this.UpdateScreen();
    }
    console.log(`child achievements ${this.child.achievementsTotal}`);
  }

  UpdateScreen() {
    this.child.achievementsTotal =0;
    
    if (this.child.myAchievements) {
      for (let i = 0; i < this.achievements.length; i++) {
        let achieve = this.child.myAchievements.find(
          //@ts-ignore
          item => item.achievementsID === this.achievements[i].id
        );
        if (achieve) {
          console.log("setting progress " + achieve.progress);
          this.achievements[i].progress = achieve.progress;

          if (this.achievements[i].progress === 100) {
            this.child.achievementsTotal++;
          }
        }
      }
    }
  }

 

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;

    console.log("constructor");

    if (dev) {
      import("../devdata/childrendata").then(devdata => {
        //@ts-ignore
        this.achievements = devdata.achievements;
        this.TotalAchievementCount = 0;
        if (this.achievements) {
          this.TotalAchievementCount = this.achievements.length || 0;
        }

        console.log("using dev test data for achievements");
      });
    } else {
      console.log("making API call");
      this.http
        .fetch(`${DNS}/api/Achievements/`, {
          method: "get",
          credentials: "include"
        })
        .then(result => result.json() as Promise<IAchievements[]>)
        .then(data => {
          console.log("Got achievements list" + data);
          console.log(data);
          this.achievements = data;

          this.TotalAchievementCount = 0;
          if (this.achievements) {
            this.TotalAchievementCount = this.achievements.length || 0;
          }

          if (this.child) {
            this.UpdateScreen();
          }
        });
    }

    //Display the total number of achivements
  }
}
