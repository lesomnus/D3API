import * as Enums from './enums';

export namespace Raw {
//
// ACT API
//

export type Quest = {
  readonly id: number;
  readonly name: String;
  readonly slug: string;
};

export type Act = {
  readonly slug: string;
  readonly number: number;
  readonly name: string;
  readonly quests: Quest[];
};

export type ActIndex = {
  readonly acts: Act[];
};

//
// ARTISAN AND RECIPE API
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

export type Artisan = {
  readonly slug: string;
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
  readonly slug: string;
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

export type Class = {
  readonly slug: string;
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
  readonly classSlug: string;
  readonly gender: number;
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
    barbarian: number;
    crusader: number;
    demonHunter: number;
    monk: number;
    necromancer: number;
    witchDoctor: number;
    wizard: number;
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
    readonly [seasonN: string]: (Profile & {
      readonly seasonId: string;
    });
  }

  readonly blacksmith: {slug: 'blacksmith'; level: number};
  readonly jeweler: {slug: 'jeweler'; level: number};
  readonly mystic: {slug: 'mystic'; level: number};
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
  readonly isJewel: boolean;  // is 'Legendary Gem' = Jewel
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
}

export type Quest = Raw.Quest;
export type Act = Raw.Act & {
  readonly slug: 'act-i' | 'act-ii' | 'act-iii' | 'act-iv' | 'act-v'
  readonly number: 1|2|3|4|5;
};
export type ActIndex = Raw.ActIndex;
export type ItemTypeIndex = Raw.ItemTypeIndex;
export type ItemType = Raw.ItemType;
export type Reagent = Raw.Reagent;
export type Recipe = Raw.Recipe;
export type Artisan = Raw.Artisan & {
  readonly slug: Enums.Artisan;
};
export type Skill = Raw.Skill;
export type Follower = Raw.Follower & {
  readonly slug: Enums.Follower;
};
export type PassiveSkill = Raw.PassiveSkill;
export type Class = Raw.Class & {
  readonly slug: Enums.Class;
};
export type Rune = Raw.Rune;
export type Attribute = Raw.Attribute;
export type Item = Raw.Item;
export type Hero = Raw.Hero;
export type Profile = Raw.Profile;
export type Accout = Raw.Account;
export type Gem = Raw.Gem;
export type Jewel = Raw.Jewel;
export type Dye = Raw.Dye;
export type DetailedItem = Raw.DetailedItem;
