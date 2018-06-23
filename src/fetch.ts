import axios from "axios";
import * as Enums from "./enums";

export default async function fetch(option: {
  endpoint: string;
  region: Enums.Region;
  locale: Enums.Locale;
  apiKey: string;
}) {
  const url = option.region == Enums.Region.CN
    ? `https://battlenet.com.cn/d3${option.endpoint
      }?locale=${option.locale}&apikey=${option.apiKey}`
    : `https://${option.region}.api.battle.net/d3${option.endpoint
      }?locale=${option.locale}&apikey=${option.apiKey}`;
  const res = await axios.get(url);

  return res.data;
}
