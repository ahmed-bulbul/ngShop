import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.aud && !this._tokenExpired(tokenDecode.exp)) return true;
      
      // let jwtData = token.split('.')[1]
      // let decodedJwtJsonData = window.atob(jwtData)
      // let decodedJwtData = JSON.parse(decodedJwtJsonData)
      // let isAdmin = decodedJwtData.admin
      // console.log('jwtData: ' + jwtData)
      // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      // console.log('decodedJwtData: ' + decodedJwtData)
      // console.log('Is admin: ' + isAdmin)
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
