export interface IAvailableRewards {
  used: boolean;
  reward: string;
  id: number;
  beingConsumed: boolean;
  browniePointsID: number;
}

export interface ISuperSwat {
  ID: number;
  browniePointsID: number;
  Day1Date: string;
  Day2Date: string;
  Day3Date: string;
  Day4Date: string;
  Day5Date: string;
  CompletedDays: number;
}

export interface Pet {
  id: number;
  eyes: number;
  selectedeyex: number;
  selectedeyey: number;
  mouth: number;
  selectedmouthx: number;
  selectedmouthy: number;
  legs: number;
  selectedlegsx: number;
  selectedlegsy: number;
  silhouette: number;
}

export interface SignedIn {
  signedIn: boolean;
  signedInAs: string;
}

export interface IMyAchievements {
  achievementsID: number;
  ID: number;
  progress: number;
}

export interface IAchievements {
  ID: number;
  title: string;
  description: string;
  progress: number;
}

export interface BrowniePoints {
  id: number;
  childName: string;
  points: number;
  level: number;
  pointsNeeded: number;
  reward: string;
  availableRewards: Array<IAvailableRewards>;
  presenting: boolean;
  pendingAdds: number;
  pet: Pet;
  avatar: string;
  removeForAnimation: boolean;
  myAchievements: Array<IMyAchievements>;
  achievementsTotal: number;
}

export interface Parent {
  ID: number;
  email: string;
  groupName: string;
}
