export enum Region {
    CN = "cn",
    EU = "eu",
    KR = "kr",
    TW = "tw",
    US = "us",
}

export enum Locale {
    CN = "zh_CN",
    EU = "en_GB",
    KR = "ko_KR",
    TW = "zh_TW",
    US = "en_US",
}

//
// NOTICE!!!
// Artisan, Follower and Class should "not" have same key name.
// reason: D3::getAllOf()
//

export enum Artisan {
    Blacksmith  = "blacksmith",
    Jewerler    = "jeweler",
    Mystic      = "mystic",
}

export enum Follower {
    Templer     = "templer",
    Scoundrel   = "scoundrel",
    Enchantress = "enchantress",
}

export enum Class {
    Barbarian    = "barbarian",
    Crusader     = "crusader",
    DemonHunter  = "demon-hunter",
    Monk         = "monk",
    Necromancer  = "necromancer",
    WitchDoctor  = "witch-doctor",
    Wizard       = "wizard",
}

export enum Gender {
    Male    = 0,
    Female  = 1,
}

export enum ItemPart {
    Head        = "head",
    Neck        = "neck",
    Torso       = "torso",
    Shoulders   = "shoulders",
    Legs        = "legs",
    Waist       = "waist",
    Hands       = "hands",
    Bracers     = "bracers",
    Feet        = "feet",
    LeftFinger  = "leftFinger",
    RightFinger = "rightFinger",
    MainHand    = "mainHand",
    OffHand     = "offhand",
  }
