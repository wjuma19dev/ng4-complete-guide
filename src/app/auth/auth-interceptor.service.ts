import { inject } from "@angular/core";
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, exhaustMap, take } from "rxjs";

/**
 * Intercetamos la peticion HTTP para agregar 
 * token a la url asi autenticar la solicitud.
 */
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>, 
  next: HttpHandlerFn,
  authService: AuthService = inject(AuthService)
): Observable<HttpEvent<any>> => {


  return authService.user.pipe(
    take(1),
    exhaustMap(user => {  
      if(!user) {
        return next(req);
      }
      const authReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      })
      return next(authReq);
    }),
  )


}