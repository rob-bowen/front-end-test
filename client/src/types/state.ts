import { Fund, Portfolio } from "@/types/funds";

/* 
  The main application state
*/
export interface ApplicationState {
  isLoggedIn: boolean;
  portfolio?: Portfolio;
  funds?: Fund[];
  loadingData: boolean;
  errorLoadingData: boolean;
  selectedAccountName: string;
  usersPortfolioName: string;
}
