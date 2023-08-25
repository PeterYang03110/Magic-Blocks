import { createContext, useContext, useState, useEffect } from 'react';
import CoinGecko from 'coingecko-api';

const ContractContext = createContext(null);

export function PriceProvider({ children }) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const getPrices = async () => {
      try {
        const CoinGeckoClient = new CoinGecko();
        const { data: response } = await CoinGeckoClient.simple.price({
          ids: ['fief', 'weth', 'wrapped-avax'],
          vs_currencies: ['usd'],
        });

        setPrices({
          fief: response['fief']?.usd || 0,
          eth: response['weth']?.usd || 0,
          avax: response['wrapped-avax']?.usd || 0,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPrices();
    setInterval(() => getPrices(), 2 * 60 * 1000);
  }, []);

  return <ContractContext.Provider value={{ prices }}>{children}</ContractContext.Provider>;
}

export function usePrices() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('Missing stats context');
  }

  return context;
}
