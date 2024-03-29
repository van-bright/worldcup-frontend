export interface Country {
  id: number;
  zhName: string;
}

export const Countries: {
  [key: string]: Country;
} = {
  Senegal: { id: 1, zhName: '塞内加尔' },
  Holland: { id: 2, zhName: '荷兰' },
  Qatar: { id: 3, zhName: '卡塔尔' },
  Ecuador: { id: 4, zhName: '厄瓜多尔' },
  England: { id: 5, zhName: '英格兰' },
  Iran: { id: 6, zhName: '伊朗' },
  Usa: { id: 7, zhName: '美国' },
  Welsh: { id: 8, zhName: '威尔士' },
  Argentina: { id: 9, zhName: '阿根廷' },
  Saudi: { id: 10, zhName: '沙特' },
  Mexico: { id: 11, zhName: '墨西哥' },
  Poland: { id: 12, zhName: '波兰' },
  Denmark: { id: 13, zhName: '丹麦' },
  Tunisia: { id: 14, zhName: '突尼斯' },
  France: { id: 15, zhName: '法国' },
  Australia: { id: 16, zhName: '澳大利亚' },
  Germany: { id: 17, zhName: '德国' },
  Japan: { id: 18, zhName: '日本' },
  Spanish: { id: 19, zhName: '西班牙' },
  CostaRica: { id: 20, zhName: '哥斯达黎加' },
  Morocco: { id: 21, zhName: '摩洛哥' },
  Croatia: { id: 22, zhName: '克罗地亚' },
  Belgium: { id: 23, zhName: '比利时' },
  Canada: { id: 24, zhName: '加拿大' },
  Switzerland: { id: 25, zhName: '瑞士' },
  Cameroon: { id: 26, zhName: '喀麦隆' },
  Brazil: { id: 27, zhName: '巴西' },
  Serbia: { id: 28, zhName: '塞尔维亚' },
  Uruguay: { id: 29, zhName: '乌拉圭' },
  Korea: { id: 30, zhName: '韩国' },
  Portugal: { id: 31, zhName: '葡萄牙' },
  Ghana: { id: 32, zhName: '加纳' },
};

interface ICountriesById {
  [id: number]: { zhName: string; enName: string };
}
export const CountriesById: ICountriesById = (() => {
  const countriesById: ICountriesById = {};
  for (const key in Countries) {
    if (Object.prototype.hasOwnProperty.call(Countries, key)) {
      const element = Countries[key];
      countriesById[element.id] = {
        zhName: element.zhName,
        enName: key,
      };
    }
  }
  console.log({ countriesById });
  return countriesById as ICountriesById;
})();

export interface CountryOptionItem {
  value: number;
  label: string;
}
export const CountryOptions = Object.keys(Countries).map(item => {
  return {
    value: Countries[item].id,
    label: Countries[item].zhName,
  }
})
