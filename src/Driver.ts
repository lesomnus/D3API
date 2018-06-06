import * as Enums from './enums';
import * as Schems from './schemes';
import fetch from './fetch';

export class Driver {
  private asdf: Driver = this;
  private apiKey: undefined|string = undefined;
  private region: undefined|Enums.Region = undefined;
  private locale: undefined|Enums.Locale = undefined;
  private endpoint: string;

  public using(apiKey: string): Driver {
    this.apiKey = apiKey;
    return this;
  }

  public from(region: Enums.Region): Driver {
    this.region = region;
    return this;
  }

  public in(locale: Enums.Locale): Driver {
    this.locale = locale;
    return this;
  }

  public async resolve(): Promise<any>{
    if(!this.region) throw new Error('Region not provided');
    if(!this.locale) throw new Error('locale not provided');
    if(!this.apiKey) throw new Error('apiKey not provided');
    if(!this.endpoint) throw new Error('endpoint not provided');
    console.log(this.endpoint);
    return await fetch({
      region: this.region,
      locale: this.locale,
      apiKey: this.apiKey,
      endpoint: this.endpoint,
    });

  }

  private getAllOf: {
    (artian: Enums.Artisan): Driver;
    (follower: Enums.Follower): Driver;
    (className: Enums.Class): Driver;
  } = (slug: any): Driver=>{
    switch(slug){
      case Enums.Artisan.Blacksmith:
      case Enums.Artisan.Jewerler:
      case Enums.Artisan.Mystic:
        this.endpoint = `/data/artisan/${slug}`;
        break;
      case Enums.Follower.Enchantress:
      case Enums.Follower.Scoundrel:
      case Enums.Follower.Templer:
        this.endpoint = `/data/follower/${slug}`;
        break;
      case Enums.Class.Barbarian:
      case Enums.Class.Crusader:
      case Enums.Class.DemonHunter:
      case Enums.Class.Monk:
      case Enums.Class.Necromancer:
      case Enums.Class.WitchDoctor:
      case Enums.Class.Wizard:
        this.endpoint = `/data/hero/${slug}`;
        break;
    }

    return this;
  }

  public get = {
    all: {
      acts: (): Driver=>{
        this.endpoint = `/data/act`;
        return this;
      },
      of: this.getAllOf,
      itemTypes: (): Driver=>{
        return this;
      },
      items: {
        of: (itemTypeSlug: string)=>{
          this.endpoint = `/data/item-type/${itemTypeSlug}`;
        },
      },
    },
    act: (actId: number): Driver=>{
      this.endpoint = `/data/act/${actId}`;
      return this;
    },
    recipe: (recipeSlug: string)=>{
      return {
        of: (artisan: Enums.Artisan): Driver=>{
          this.endpoint = `/data/artisan/${artisan}/recipe/${recipeSlug}`;
          return this;
        },
      };
    },
    skill: (skillSlug: string)=>{
      return {
        of: (className: Enums.Class): Driver=>{
          this.endpoint = `/data/hero/${className}/skill/${skillSlug}`;
          return this;
        },
      };
    },
    item: (itemSlugAndId: string): Driver=>{
      this.endpoint = `/data/item/${itemSlugAndId}`;
      return this;
    },
    profile: {
      of: (battleTag: string): Driver=>{
        this.endpoint = `/profile/${battleTag}`;
        return this;
      },
    },
    hero: (heroId: number)=>{
      return {
        of: (battleTag: string): Driver=>{
          this.endpoint = `/profile/${battleTag}/hero/${heroId}`;
          return this;
        },
      };
    },
  };
}
