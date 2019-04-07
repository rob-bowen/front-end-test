import { LoginInputModel } from "@/types/login";

import axios from "axios";

/*
  Makes the required api call to login in a user with their entered credentials
*/
export const login = (credentials: LoginInputModel): Promise<any> => {
  return axios.post("/api/login", credentials);
};
