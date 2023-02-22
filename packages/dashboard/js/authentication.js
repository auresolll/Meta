import { api } from "./api.js";

export const authentication = (() => {
  const signIn = (loginData) => {
    console.log(`[authentication]: starting authentication with api`);
    api.loginRequest(loginData);
  };
  return {
    signIn,
  };
})();
