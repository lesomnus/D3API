import * as Enums from "./enums";
import fetch from "./fetch";
import * as Schems from "./schemes";

export class D3API {
  private _apiKey: undefined|string = undefined;
  private _region: undefined|Enums.Region = undefined;
  private _locale: undefined|Enums.Locale = undefined;
  private _endpoint: string;

  public using(apiKey: string): D3API {
    this._apiKey = apiKey;
    return this;
  }

  public from(region: Enums.Region): D3API {
    this._region = region;
    return this;
  }

  public in(locale: Enums.Locale): D3API {
    this._locale = locale;
    return this;
  }

  public async resolve(): Promise<any> {
    if(!this._region) { throw new Error("Region not provided"); }
    if(!this._locale) { throw new Error("locale not provided"); }
    if(!this._apiKey) { throw new Error("apiKey not provided"); }
    if(!this._endpoint) { throw new Error("endpoint not provided"); }

    const endpoint = this._endpoint;
    this._endpoint = undefined;
    return await fetch({
      region: this._region,
      locale: this._locale,
      apiKey: this._apiKey,
      endpoint,
    });
  }

  private _setEndpoint(endpoint: string) {
    if(!this._endpoint) { console.warn("endpoint overwited"); }
    this._endpoint = endpoint;
  }

  private getAllOf: {
    (artisan: Enums.Artisan): D3API;
    (follower: Enums.Follower): D3API;
    (className: Enums.Class): D3API;
  } = (slug: any): D3API=> {
    switch(slug) {
      case Enums.Artisan.Blacksmith:
      case Enums.Artisan.Jewerler:
      case Enums.Artisan.Mystic:
        this._setEndpoint(`/data/artisan/${slug}`);
        break;
      case Enums.Follower.Enchantress:
      case Enums.Follower.Scoundrel:
      case Enums.Follower.Templer:
        this._setEndpoint(`/data/follower/${slug}`);
        break;
      case Enums.Class.Barbarian:
      case Enums.Class.Crusader:
      case Enums.Class.DemonHunter:
      case Enums.Class.Monk:
      case Enums.Class.Necromancer:
      case Enums.Class.WitchDoctor:
      case Enums.Class.Wizard:
        this._setEndpoint(`/data/hero/${slug}`);
        break;
      default:
        break;
    }

    return this;
  }

  public get = {
    all: {
      acts: (): D3API=> {
        this._setEndpoint(`/data/act`);
        return this;
      },
      of: this.getAllOf,
      itemTypes: (): D3API=> {
        return this;
      },
      items: {
        of: (itemTypeSlug: string)=> {
         this. _setEndpoint(`/data/item-type/${itemTypeSlug}`);
        },
      },
    },
    act: (actId: number): D3API=> {
      this._setEndpoint(`/data/act/${actId}`);
      return this;
    },
    recipe: (recipeSlug: string)=> {
      return {
        of: (artisan: Enums.Artisan): D3API=> {
          this._setEndpoint(`/data/artisan/${artisan}/recipe/${recipeSlug}`);
          return this;
        },
      };
    },
    skill: (skillSlug: string)=> {
      return {
        of: (className: Enums.Class): D3API=> {
          this._setEndpoint(`/data/hero/${className}/skill/${skillSlug}`);
          return this;
        },
      };
    },
    item: (itemSlugAndId: string): D3API=> {
      this._setEndpoint(`/data/item/${itemSlugAndId}`);
      return this;
    },
    profile: {
      of: (battleTag: string): D3API=> {
        this._setEndpoint(`/profile/${battleTag}`);
        return this;
      },
    },
    hero: (heroId: number)=> {
      return {
        of: (battleTag: string): D3API=> {
          this._setEndpoint(`/profile/${battleTag}/hero/${heroId}`);
          return this;
        },
      };
    },
  };
}
