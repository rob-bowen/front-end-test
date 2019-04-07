import Axios from "axios";
import { Portfolio } from "@/types/funds";

/* 
  Makes the api calls required to return a named portfolio
*/
export const getPortfolioWithAccounts = (name: string): Promise<Portfolio> => {
  return <Promise<Portfolio>>(
    Axios.get(`/api/portfolios/${name}`).then(res => res.data)
  );
};
