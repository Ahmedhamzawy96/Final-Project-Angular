import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/Interface/Enums/user-type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
<<<<<<< HEAD
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (JSON.parse(localStorage.getItem('Type'))!=UserType.Car)
      {
        return true;
      }
      else
      {
        this.router.navigate(['/Login']);
        return false;
      }
=======
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (JSON.parse(localStorage.getItem('Type')) != UserType.Car) {
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
>>>>>>> 06fafa74c9476b4174e60853a37deda696b99dc5
  }
}
