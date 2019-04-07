import Axios from "axios";
import { Portfolio, Trade } from "@/types/funds";

/* 
  Makes the api calls required to return a named portfolio
*/
export const getPortfolioWithAccounts = (name: string): Promise<Portfolio> => {
  return <Promise<Portfolio>>(
    Axios.get(`/api/portfolios/${name}`).then(res => res.data)
  );
};

/* 
  Make the api calls required to place a trade
*/
export const placeTrade = (
  portfolioName: string,
  accountName: string,
  trade: Trade
): Promise<void> => {
  return Axios.post(
    `/api/portfolios/${portfolioName}/accounts/${accountName}/trades`,
    trade
  ).then(res => res.data);
};
