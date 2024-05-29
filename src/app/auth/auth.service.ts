import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, tap, throwError, BehaviorSubject } from "rxjs";
import { User } from "./auth.model";

const endpoint = {
    signup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
}
const apiKey: string = 'AIzaSyArvPhgVhm7VkueSybrT0Sg2BoUAXkzct8';


export interface ResponsePayload {
    expiresIn: string;
    email: string;
    refreshToken: string;
    localId: string;
    idToken: string;
    kind: string;
}

@Injectable()
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient
    ) {}


    private errorHandler(errorResp: HttpErrorResponse) {
        let errorMessage: string = ''
        switch(errorResp.error.error.message) {
            case "EMAIL_EXISTS": 
                errorMessage = "The Email Exists Already";
                break
            case "INVALID_LOGIN_CREDENTIALS" || "EMAIL_NOT_FOUND"|| "INVALID_PASSWORD":
                errorMessage = "Invalid Login Credentials"
                break
            case "USER_DISABLED":
                errorMessage = 'User Disabled';
                break
            default: 
                errorMessage = "An Error Ocurred!";
                break
        }
        return throwError(errorMessage);
    }

    signup(email: string, password: string): Observable<ResponsePayload> {
        let url: string =  endpoint.signup.replace('[API_KEY]', apiKey);
        return this.http.post<ResponsePayload>(url, {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.errorHandler),
            tap((responseData) => {
                const { email, localId, idToken, expiresIn } = responseData;
                this.handlerAuthentication(email, localId, idToken, +expiresIn);
            })
        );
    }

    login(email: string, password: string): Observable<ResponsePayload> {
        let url = endpoint.login.replace('[API_KEY]', apiKey)
        return this.http.post<ResponsePayload>(url, {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.errorHandler),
            tap((responseData) => {
                const { email, localId, idToken, expiresIn } = responseData;
                this.handlerAuthentication(email, localId, idToken, +expiresIn);
            })
        );
    }

    handlerAuthentication( email: string, localId: string, idToken: string, expiresIn: number ) {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        const user = new User(
            email,
            localId,
            idToken,
            expirationDate
        );
        this.user.next(user);
    }

}