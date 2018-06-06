/// <reference types="node" />
/// <reference types="mocha" />

import * as path from 'path';
import { promisify } from 'util';
import { readFile as _readFile, readFileSync } from 'fs';
import { Driver } from './build/Driver';
import {
  Artisan,
  Region,
  Locale,
  Class,
} from './build/enums';

import * as chai from 'chai';
const expect = chai.expect;

//
// util
//
const readFile = promisify(_readFile);
async function getJSON(p: string): Promise<any>{
  const content = await readFile(p, {
    encoding: 'utf8',
  });
  return JSON.parse(content);
}
function getJSONSync(path: string): any{
  const content = readFileSync(path, {
    encoding: 'utf8',
  });
  return JSON.parse(content);
}

const apiKey = getJSONSync('test/config.json').apiKey;

//
// test
//
describe('Fetching', ()=>{
  function tester(path: string, driver: Driver){
    return async function (){
      let res;
      let ans;

      [res, ans] = [
        await driver.resolve(),
        await getJSON(path),
      ];

      expect(res).to.deep.equal(ans);
    };
  }

  it('should get all acts', tester(
    'test/testset/DATA_ACT.kr.json',
    (new Driver).get.all.acts()
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it('should get act 1', tester(
    'test/testset/DATA_ACT_1.kr.json',
    (new Driver).get.act(1)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it('should get recipe apprentice-flamberge of blacksmith', tester(
    'test/testset/DATA_ARTISAN_blacksmith_RECIPE_apprentice-flamberge.kr.json',
    (new Driver).get.recipe('apprentice-flamberge').of(Artisan.Blacksmith)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it('should get all of barbarian', tester(
    'test/testset/DATA_HERO_barbarian.kr.json',
    (new Driver).get.all.of(Class.Barbarian)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
  it('should get skill bash of barbarian', tester(
    'test/testset/DATA_HERO_barbarian_SKILL_bash.kr.json',
    (new Driver).get.skill('bash').of(Class.Barbarian)
      .from(Region.KR).in(Locale.KR).using(apiKey),
  ));
});