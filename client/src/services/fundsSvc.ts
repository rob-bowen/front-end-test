import axios from "axios";
import { Fund, FundHolding, HoldingAmount } from "@/types/funds";

/*
  Make the required api calls to pull back all the funds with their histories
*/
export const getFundsWithHistory = (): Promise<Fund[]> => {
  // 1) Request the list of all funds
  return <Promise<Fund[]>>axios
    .get("/api/funds")
    .then(res => res.data)
    .then((fundsWithoutHistory: Fund[]) => {
      /* 
        2) For each fund send off a request for its history to save getting it later.
           For a larger number of funds I would fetch on demand
      */
      const getFundWithHistoryPromises = fundsWithoutHistory.map(fund => {
        return axios
          .get(`/api/funds/${fund.isin}`)
          .then(res => res.data)
          .then(fundDetails => {
            // 3) Merge the basic record with the details (i,e. - add the history)
            const detailedFund: Fund = {
              ...fund,
              history: fundDetails.history
            };
            return detailedFund;
          });
      });

      // 4) End result will be an array of Funds complete with populated history
      return new Promise((resolve, reject) => {
        // N.b. Artificial delay so that you can see the spinner!
        setTimeout(() => {
          // N.b. Swap the following two lines to test loading errors
          // reject("testing reload");
          Promise.all(getFundWithHistoryPromises).then(data => resolve(data));
        }, 2000);
      });
    });
};

/* 
  Calcule the value of a holding using a fund and its holding amount
*/
export const calculateHoldingValue = (
  fund: Fund,
  holdingAmount: HoldingAmount
): number => {
  const unitPrice: number = fund.price;
  const quantityHeld: number =
    holdingAmount.unscaled * Math.pow(10, holdingAmount.exponent);
  return unitPrice * quantityHeld;
};

/* 
  Create a fund holding from a funds, its holding amount, and the total portfolio value.
  The HoldFunding is our object that holds the details of the fund, along the holdings value, and
  percentage of portfolio value
*/
export const createFundHoldings = (
  fund: Fund,
  holdingAmount: HoldingAmount,
  totalPortfolioValue: number
): FundHolding => {
  const value = calculateHoldingValue(fund, holdingAmount);
  const percentageOfPortfolio = (value / totalPortfolioValue) * 100;

  const fundHolding: FundHolding = {
    ...fund,
    value,
    percentageOfPortfolio
  };

  return fundHolding;
};
