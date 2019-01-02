export interface IAvailableRewards {
  used: boolean;
  reward: string;
  id: number;
  beingConsumed: boolean;
  browniePointsID: number;
}

export interface Pet {
  id: number;
  eyes: number;
  selectedeyex: number;
  selectedeyey: number;
  mouth: number;
  selectedmouthx: number;
  selectedmouthy: number;
  silhouette: number;
}

export interface SignedIn {
  signedIn: boolean;
  signedInAs: string;
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
}

export interface Parent {
  ID: number;
  email: string;
  groupName: string;
}
