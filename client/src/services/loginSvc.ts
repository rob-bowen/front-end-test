import { LoginInputModel } from "@/types/login";

import axios from "axios";

export const login = (credentials: LoginInputModel): Promise<any> => {
  console.log("CREDENTIALS", credentials);
  return axios.post("/api/login", credentials);
};
