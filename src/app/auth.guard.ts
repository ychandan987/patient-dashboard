import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CryptService } from './crypt.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private crypt: CryptService, private router: Router) {}

  currentUser = JSON.parse(this.crypt.get('currentUser'));

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('currentUser')) {
        if (this.currentUser.username) {
          // console.log('true');
          return true;
        }
        // console.log('false');
        this.router.navigate(['login']);
        return false;
      }
      this.router.navigate(['login']);
      return false;
  }
}
