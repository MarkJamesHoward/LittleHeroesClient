import { IMyAchievements, IAchievements, BrowniePoints } from "./interfaces";

let achievements: IAchievements[];

export async function FindAchievement(child: BrowniePoints, AchievementName: string
  , dev, DNS) {

  if (achievements === undefined) {
    achievements = await GetAchievementsList(dev, DNS);
  }
  let Achievement = achievements.find((item: IAchievements) => item.title === AchievementName);
  let MyAchievement: IMyAchievements = child.myAchievements.find(
    item => item.achievementsID === Achievement.id
  );

  return MyAchievement;
}

export async function GetAchievementsList(dev: boolean, DNS: string) {
  if (dev) {
    let myimport = await import("../components/devdata/childrendata");
    //@ts-ignore
   return myimport.achievements;
  } else {
    let result = await fetch(`${DNS}/api/Achievements/`, {
      method: "get",
      credentials: "include"
    });
    let data = (await result.json()) as IAchievements[];
    return data;
  }
}