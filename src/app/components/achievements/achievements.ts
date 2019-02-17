import { BrowniePoints } from "../../library/interfaces";
import { IAchievements, IMyAchievements } from "../../library/interfaces";
import "@polymer/paper-progress/paper-progress.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import { DNS, dev, GetBrowniePoints, SetBrowniePoints } from "../global";
import { data } from '../devdata/childrendata';

@inject(Router, HttpClient)
export class Achievements {
  private achievements: Array<IAchievements>;
  private router: Router;
  private http: HttpClient;
  private browniePoints: Array<BrowniePoints>;
  private child: BrowniePoints;

  Back() {
    this.router.navigate('/children')
  }

  activate(params: any) {
    console.log(`loading achievements for ${params.id}`);
    if (dev) {
      this.browniePoints = data;
      SetBrowniePoints(this.browniePoints);
    }
    this.browniePoints = GetBrowniePoints();
    this.child = this.browniePoints.find(item => item.id == params.id);

    for (let i=0; i < this.achievements.length; i++) {
      let achieve = this.child.achievements.find(item => item.achievementID === this.achievements[i].ID );
      if (achieve) {
        console.log('setting progress ' + achieve.progress  )
        this.achievements[i].progress = achieve.progress ;
      }
    }
    console.log(`child achievements ${this.child.achievementsTotal}`);
  }

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;

    console.log("constructor");

    if (dev) {
      this.GetAchievements();
      console.log("using dev test data for achievements");
    } else {
      console.log('making API call')
      this.http
        .fetch(`${DNS}/api/Achievements/`, {
          method: "get",
          credentials: "same-origin"
        })
        .then(result => result.json() as Promise<IAchievements[]>)
        .then(data => {
          console.log("Got achievements list" + data);
          this.achievements = data;
        });
    }
  }

  private GetAchievements() {
    this.achievements = new Array<IAchievements>();

    this.achievements.push({
      ID: 1,
      title: "Super Swat",
      description: "Earn points on 5 consecutive days",
      progress: 0
    });
    this.achievements.push({
      ID: 2,
      title: "Mega Points",
      description: "Earn 50 points in one day",
      progress: 0
    });
  }
}
