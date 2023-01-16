const BASE_CONVERT_URL = "https://api.exchangerate.host/convert?";

type getConvertRate = (params: { from: string; to: string }) => Promise<number>;

export const getConvertRate = async (params: { from: string; to: string }) => {
  const url = `${BASE_CONVERT_URL}from=${params.from}&to=${params.to}`;
  const res = await fetch(url);
  const data: { success: boolean; result?: number } = await res.json();
  if (data.success) {
    const rate = data.result;
    return rate;
  } else {
    console.error("Failed to request.");
  }
};

interface CurrencyState {
  abbr: string;
  name: string;
}

export const getCurrencies = async () => {
  const currencies: CurrencyState[] = [];

  const res = await fetch("https://api.exchangerate.host/symbols");
  const data = await res.json();
  const symbols = data.symbols;

  for (const key in symbols) {
    if (Object.prototype.hasOwnProperty.call(symbols, key)) {
      const element = symbols[key];
      currencies.push({
        abbr: element.code,
        name: element.description,
      });
    }
  }

  return currencies;
};
