import { createContext, useState } from 'react';

export const DealsContext = createContext({ deals: [], addDeal: () => {} });

export function DealsProvider({ children }) {
  const [deals, setDeals] = useState([]);
  const addDeal = (flight, hotel) => setDeals([...deals, { flight, hotel }]);
  return (
    <DealsContext.Provider value={{ deals, addDeal }}>
      {children}
    </DealsContext.Provider>
  );
}
