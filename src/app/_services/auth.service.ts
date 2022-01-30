import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API = 'https://localhost:44395/api/account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
      confirmPassword,
    }, httpOptions);
  }
}
