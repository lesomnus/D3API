/// <reference types="node" />
/// <reference types="mocha" />

import { readFile as _readFile, readFileSync } from "fs";
import { promisify } from "util";
import { D3API } from "./build/D3API";
import {
  Artisan,
  Class,
  Locale,
  Region,
} from "./build/enums";

import * as chai from "chai";
chai.config.showDiff = false;
const expect = chai.expect;

//
// config
//
const isDeepTest = process.env.TEST_DEEP || false;

//
// util
//
const readFile = promisify(_readFile);
async function getJSON(p: string) {
  const content = await readFile(p, {
    encoding: "utf8",
  });
  return JSON.parse(content);
}
function getJSONSync(path: string): any {
  const content = readFileSync(path, {
    encoding: "utf8",
  });
  return JSON.parse(content);
}

const apiKey = getJSONSync("test/config.json").apiKey;

//
// test
//
describe("Fetching", ()=> {
  function tester(path: string, driver: D3API) {
    return async ()=> {
      if(!isDeepTest) {
        await driver.resolve();
        return;
      }

      let res;
      let ans;

      [res, ans] = [
        await driver.resolve(),
        await getJSON(path),
      ];

      if(Array.isArray(res)) {
        expect(res).to.deep.include.members(ans);
      } else {
        expect(res).deep.include(ans);
      }
    };
  }

  //
  // ACT API
  //
  it("should get all acts", tester(
    "test/testset/DATA_ACT.kr.json",
    new D3API().get.all.acts
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it("should get act 1", tester(
    "test/testset/DATA_ACT_1.kr.json",
    new D3API().get.act(1)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it("should get act 1 from China", tester(
    "test/testset/DATA_ACT_1.kr.json",
    new D3API().get.act(1)
      .from(Region.CN).in(Locale.KR).using(apiKey),
  ));

  //
  // ARTISAN AND RECIPE API
  //
  it("should get recipe apprentice-flamberge of blacksmith", tester(
    "test/testset/DATA_ARTISAN_blacksmith_RECIPE_apprentice-flamberge.kr.json",
    new D3API().get.recipe("apprentice-flamberge").of(Artisan.Blacksmith)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));

  //
  // CHARACTER CLASS AND SKILL API
  //
  it("should get all of barbarian", tester(
    "test/testset/DATA_HERO_barbarian.kr.json",
    new D3API().get.all.of(Class.Barbarian)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it("should get skill bash of barbarian", tester(
    "test/testset/DATA_HERO_barbarian_SKILL_bash.kr.json",
    new D3API().get.skill("bash").of(Class.Barbarian)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  
  //
  // ITEM TYPE API
  //
  it("should get all itemtypes", tester(
    "test/testset/DATA_ITEM-TYPE.kr.json",
    new D3API().get.all.itemTypes
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it("should get all items of sword2h", tester(
    "test/testset/DATA_ITEM-TYPE_sword2h.kr.json",
    new D3API().get.all.items.of("sword2h")
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  
  //
  // ITEM API
  //
  it("should get all item corrupted-ashbringer-Unique_Sword_2H_104_x1", tester(
    "test/testset/DATA_ITEM_corrupted-ashbringer-Unique_Sword_2H_104_x1.kr.json",
    new D3API().get.item("corrupted-ashbringer-Unique_Sword_2H_104_x1")
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));

  //
  // PROFILE API
  //
  if(!isDeepTest) { it("should get profile for SOMNUS-31333 from kr", tester("",
    new D3API().get.profile.for("SOMNUS-31333")
    .from(Region.KR).in(Locale.KR).using(apiKey),
  )); }
  if(!isDeepTest) { it("should get hero 68225979 in SOMNUS-31333 from kr", tester("",
    new D3API().get.hero(68225979).in("SOMNUS-31333")
    .from(Region.KR).in(Locale.KR).using(apiKey),
  )); }
  if(!isDeepTest) { it("should get items belongs to hero 68225979 in SOMNUS-31333 from kr", tester("",
    new D3API().get.items.belonging.to.hero(68225979).in("SOMNUS-31333")
    .from(Region.KR).in(Locale.KR).using(apiKey),
  )); }
  if(!isDeepTest) { it("should get items belongs to followeres of hero 68225979 in SOMNUS-31333 from kr", tester("",
    new D3API().get.items.belonging.to.followers.of.hero(68225979).in("SOMNUS-31333")
    .from(Region.KR).in(Locale.KR).using(apiKey),
  )); }

});
