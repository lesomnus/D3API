import * as Enums from './enums';

//
// ACT API
//

export type Quest = {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
};

export type Act = {
  readonly slug: string;
  readonly number: number;
  readonly name: string;
  readonly quests: Quest[];
};

//
// ARTISIAN AND RECIPE API
//

export type ItemTypeIndex = {
  readonly id: string;
  readonly name: string;
  readonly path: string;
};

export type ItemType = ItemTypeIndex & {
  readonly slug: string;
  readonly icon: string;
};

export type Reagent = {
  readonly quantity: number;
  readonly item: ItemType;
};

export type Recipe = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly cost: number;
  readonly reagents: Reagent[];
};

export type ArtisianSlug = 'blacksmith'
                         | 'jeweler'
                         | 'mystic';

export type Artisian = {
  readonly slug: ArtisianSlug;
  readonly name: string;
  readonly portrait: string;
  readonly trainig: {
    readonly tiers: {
      readonly tier: number;
      readonly trainedRecipes: Recipe[];
      readonly taughtRecipes: Recipe[];
    }[];
  };
};

//
// FOLLOWER API
//

export type Skill = {
  readonly slug: string;
  readonly name: string;
  readonly icon: string;
  readonly level: number;
  readonly tooltipUrl: string;
  readonly description: string;
  readonly descriptionHtml: string;
};

export type Follower = {
  readonly slug: Enums.Follower;
  readonly name: string;
  readonly realName: string;
  readonly skills: Skill[];
};

//
// CHARACTER CLASS AND SKILL API
//

export type PassiveSkill = Skill & {
  readonly flavorText: string;
};

export type ClassSlug = 'barbarian'
                      | 'crusader'
                      | 'demon-hunter'
                      | 'monk'
                      | 'necromancer'
                      | 'witch-doctor'
                      | 'wizard';

export type Class = {
  readonly slug: ClassSlug;
  readonly name: string;
  readonly maleName: string;
  readonly femaleName: string;
  readonly icon: string;
  readonly skillCategories: {
    readonly slug: string,
    readonly name: string,
  }[];
  readonly skills: {
    readonly active: Skill[];
    readonly passive: PassiveSkill[];
  };
};

export type Rune = {
  readonly slug: string;
  readonly type: string;
  readonly name: string;
  readonly level: number;
  readonly description: string;
  readonly descriptionHtml: string;
};

//
// ITEM TYPE API
//

export type Attribute ={
  readonly text: string;
  readonly textHtml: string;
};

export type Item = ItemType & {
  readonly tooltipParams: string;
  readonly requiredLevel: number;
  readonly stackSizeMax: number;
  readonly accountBound: boolean;
  readonly flavorText: string;
  readonly flavorTextHtml: string;
  readonly typeName: string;
  readonly type: {
    readonly id: string;
    readonly twoHanded: boolean;
  };

  readonly damage?: string;
  readonly dps?: string;
  readonly damageHtml?: string;
  readonly armor?: string;
  readonly armorHtml?: string;
  readonly block?: string;
  readonly blockHtml?: string;

  readonly color: string;
  readonly isSeasonRequiredToDrop: boolean;
  readonly seasonrequiredToDrop: number;
  readonly slots: string[];
  readonly attributes: {
    readonly primary: Attribute[],
    readonly secondary: Attribute[],
    readonly other: Attribute[], // wtf is this
  };
  readonly randomAffixes: {
    readonly oneOf: Attribute[];
  }[];

  readonly setName?: string;
  readonly setNameHtml?: string;
  readonly setDescriptoin?: string;
  readonly setItems: string[];
};

//
// PROFILE API
//

export type Hero = {
  readonly id: number;
  readonly name: string;
  readonly class: string;
  readonly classSlug: ClassSlug;
  readonly gender: Enums.Gender;
  readonly level: number;
  readonly kills: {
    readonly elites: number;
  }
  readonly paragonLevel: number; // wtf, duplicated
  readonly hardcore: boolean;
  readonly seasonal: boolean;
  readonly dead: boolean;
  readonly 'last-updated': number; // epoch
};

export type Profile = {
  readonly paragonLevel: number;
  readonly paragonLevelHardcore: number;
  readonly kills: {
    readonly monsters: number;
    readonly elites: number;
    readonly hardcoreMonsters: number;
  },
  readonly timePlayed: {
    readonly [P in Enums.Class]: number;
  }
  readonly highestHardcoreLevel: number;
};

export type Account = Profile & {
  readonly battleTag: string;
  readonly paragonLevelSeason: number;
  readonly paragonLevelSeasonHardcore: number;
  readonly guildName: string;
  readonly heroes: Hero[];
  readonly lastHeroPlayed: number; // hero id
  readonly lastUpdated: number; // epoch
  readonly progression: {
    readonly act1: boolean;
    readonly act2: boolean;
    readonly act3: boolean;
    readonly act4: boolean;
    readonly act5: boolean;
  }
  readonly seasonalProfiles: {
    readonly season13: (Profile & {
      readonly seasonId: number;
    });
    readonly season12: (Profile & {
      readonly seasonId: number;
    });
    readonly season0: (Profile & {
      readonly seasonId: number;
    });
  }
} & {
  readonly [Key in Enums.Artisian]: {
    readonly slug: ArtisianSlug;
    readonly level: number;
  }
} & {
  // what a shits
  readonly blacksmithSeason: {slug: 'blacksmith'; level: number};
  readonly jewelerSeason: {slug: 'jeweler'; level: number};
  readonly mysticSeason: {slug: 'mystic'; level: number};
  readonly blacksmithHardcore: {slug: 'blacksmith'; level: number};
  readonly jewelerHardcore: {slug: 'jeweler'; level: number};
  readonly mysticHardcore: {slug: 'mystic'; level: number};
  readonly blacksmithSeasonHardcore: {slug: 'blacksmith'; level: number};
  readonly jewelerSeasonHardcore: {slug: 'jeweler'; level: number};
  readonly mysticSeasonHardcore: {slug: 'mystic'; level: number};
};

export type Gem = {
  readonly item: ItemType;
  readonly attributes: string[];
  readonly isGem: boolean;    // is Gem
  readonly isJewel: boolean;  // is Legendary Gem = Jewel
};

export type Jewel = Gem & {
  readonly jewelRank: number;
  readonly jewelSecondaryUnlockRank: number;
  readonly isGem: false;
  readonly isJewel: true;
};

export type Dye = {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly tooltipParams: string;
};

export type DetailedItem = Item & {
  readonly displayColor: string;
  readonly itemLevel: number;
  readonly attackPerSecond: number;
  readonly minDamage: number;
  readonly maxDamage: number;
  readonly slots: string|string[];
  readonly augmentation: string;
  readonly openSockets: number;
  readonly gems: Gem[];
  readonly dye: Dye;
};
