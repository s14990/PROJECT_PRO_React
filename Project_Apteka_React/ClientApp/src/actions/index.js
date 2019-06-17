import { LOGIN_SUCCESS } from "../constants";


export function AddUser(payload) {
    return { type: LOGIN_SUCCESS, payload };
}