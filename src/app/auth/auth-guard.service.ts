import { inject } from "@angular/core";
import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  Router, 
  RouterStateSnapshot, 
  UrlTree 
} from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router = inject(Router),
  authService: AuthService = inject(AuthService)
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  return authService.user.pipe(
    map(user => {
      const isAuth = !!user;
      if(isAuth) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  )
  
}