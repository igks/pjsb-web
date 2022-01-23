//===================================================
// Date         : 23 Jan 2022
// Author       : I Gusti Kade Sugiantara
// Description  : Authentication service
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import * as API from "services/http-service";
const baseTarget = "auth";

export const login = async (credential) => {
  let target = `${baseTarget}/login`;
  return await API.post(target, credential);
};

export const logout = async () => {
  let target = `${baseTarget}/logout`;
  return await API.post(target, null);
};
