import { FETCH_ALL_USER } from "../constants/profileUserConstant";

export function listenToAllUser(users) {
  return {
    type: FETCH_ALL_USER,
    payload: users,
  };
}
