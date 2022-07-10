import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtService} from "../../services/jwt.service";
import {Config} from "../../config/config";
import {Role} from "../../models/enums/role";

@Injectable({
  providedIn: 'root'
})
export class DynamicGuardGuard implements CanActivate {

  userPrivilegeList = [];

  constructor(private jwtService: JwtService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let methods = next.data.methods as Array<string>;
    // this.userPrivilegeList = this.jwtService.decode(Config.getLocalStorageToken()).privilege;
    this.userPrivilegeList = Config.getLocalStorageUserPrivilege();
    for (let method of methods) {
      if (this.userPrivilegeList.findIndex( privilege => privilege === method) !== -1) {
        return true;
      } else if (Config.getLocalStorageUser().userType.role === Role.ADMIN) {
        return true;
      }
    }
    return false;
  }

}
