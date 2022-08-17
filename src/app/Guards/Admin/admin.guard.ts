import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/Interface/Enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (JSON.parse(localStorage.getItem('Type'))==UserType.Admin)
      {
        return true;
      }
      else
      {
        console.log(localStorage.getItem('Type'))

        this.router.navigate(['/Login']);
        return false;
      }
  }
  
}
