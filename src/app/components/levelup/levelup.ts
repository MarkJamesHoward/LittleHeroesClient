import { resolve } from '@aurelia/kernel';
import { IRouter } from '@aurelia/router-lite';
import { BrowniePoints } from "app/library/interfaces";
import { dev, SetBrowniePoints, GetBrowniePoints } from "../global";
import { data } from "../devdata/childrendata";
import clappingSound from "../../sounds/clapping.mp3";

export class LevelUp {
  scrollPos: number = 0;
  private router = resolve(IRouter);
  name: String;
  reward: String;
  child: BrowniePoints;
  browniePoints: Array<BrowniePoints>;
  sound = new Audio();

  Continue() {
    this.sound.pause();
    this.router.load(`/children/0/${this.scrollPos}`);
  }

  loading(params: any) {
    this.scrollPos = params.scrollPos;

    console.log(`loading achievements for ${params.id}`);
    if (dev) {
      this.browniePoints = data;
      SetBrowniePoints(this.browniePoints);
    }
    this.browniePoints = GetBrowniePoints();

    this.child = this.browniePoints.find(item => item.id == params.id);

    this.sound.src = clappingSound;
    this.sound
      .play()
      .then(() => {
        console.log("completed sounds");
      })
      .catch(e => {
        console.log("error playing sound " + e);
      });
  }

  public CloseLevelUp() {
    this.sound.pause();
    this.router.load(`unlock/${this.child.level}/${this.scrollPos}`);
  }

  constructor() {
  }
}
