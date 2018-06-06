import axios from 'axios';
import * as Enums from './enums';
import * as Schems from './schemes';

const base = 'api.battle.net';

export default async function fetch(option: {
  endpoint: string;
  region: Enums.Region;
  locale: Enums.Locale;
  apiKey: string;
}){
  const url = `https://${
    option.region
  }.${base}/d3${
    option.endpoint
  }?locale=${
    option.locale
  }&apikey=${
    option.apiKey
  }`;
  const res = await axios.get(url);

  return res.data;
}
