import {User} from "../models/user/user";

export class Config {

  public static setLocalStorageToken(token: string) {
    localStorage.setItem('token', token)
  }

  public static getLocalStorageToken() {
    return localStorage.getItem('token');
  }

  public static setLocalStorageRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token)
  }

  public static getLocalStorageRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  public static setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public static getLocalStorageUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public static setUserPrivilege(privilege: string[]) {
    localStorage.setItem('userPrivilege', JSON.stringify(privilege));
  }

  public static getLocalStorageUserPrivilege(): string[] {
    return JSON.parse(localStorage.getItem('userPrivilege'));
  }
}
