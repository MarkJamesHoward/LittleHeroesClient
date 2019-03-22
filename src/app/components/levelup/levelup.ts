import { inject, child } from "aurelia-framework";
import { Router } from "aurelia-router";
import "@polymer/paper-button";
import { BrowniePoints } from "app/library/interfaces";
import { dev, SetBrowniePoints, GetBrowniePoints } from "../global";
import { data } from "../devdata/childrendata";

@inject(Router)
export class LevelUp {
  router: Router;
  name: String;
  reward: String;
  child: BrowniePoints;
  browniePoints: Array<BrowniePoints>

  Continue() {
    this.router.navigate("/children/0");
  }

  activate(params: any) {
    console.log(`loading achievements for ${params.id}`);
    if (dev) {
      this.browniePoints = data;
      SetBrowniePoints(this.browniePoints);
    }
    this.browniePoints = GetBrowniePoints();

    this.child = this.browniePoints.find(item => item.id == params.id);

    const sound = new Audio();
    sound.src = require('../../sounds/clapping.mp3');
    sound.play();
  }

  public CloseLevelUp() {
    this.router.navigate(`unlock/${this.child.level}`);
  }


  constructor(router: Router) {
    this.router = router;
  }
}
