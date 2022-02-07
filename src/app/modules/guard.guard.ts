import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

      return new Promise((resolve, reject)=>{
        this.auth.isAuthenticated$.subscribe(data=> {
          if(data) resolve(true);
          if(!data){
            this.router.navigateByUrl('/home');
            resolve(false);
          }

        })
      })



  }

}
