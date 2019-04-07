/************************************************
  Models for api results
************************************************/

/* 
  The top level portfolio object containing a collection of accounts.
*/
export interface Portfolio {
  name: string;
  accounts: Account;
}

/*
  An account containing holdings.
*/
export interface Account {
  name: string;
  holdings: Holdings;
}

/*
  A dictionary struction containing HoldingAmounts keyed by a funds ISIN
*/
export type Holdings = Record<string, HoldingAmount>;

/* 
  Store the data required to calculate the quantity of a holding as returned
*/
export interface HoldingAmount {
  unscaled: number;
  exponent: number;
}

/*
  Holds the Funds details (including history) as returned from the funds service.
*/
export interface Fund {
  isin: string;
  name: string;
  price: number;
  history?: FundHistoryItem;
}

/*
  Snapshot of funds unit price at a point of time
*/
export interface FundHistoryItem {
  date: string;
  price: number;
}

/************************************************
  Models for the UI
************************************************/

/*
  Merged UI model containing full details for a fund holding, i.e. funds details and history,
  and the the holdings value/ percentage of portfolio
*/
export interface FundHolding {
  isin: string;
  name: string;
  price: number;
  history?: FundHistoryItem;
  value: number;
  percentageOfPortfolio: number;
}
