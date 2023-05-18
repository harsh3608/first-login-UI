import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, ReturnResponse } from '../user-models/user-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseServerUrl: string = 'https://localhost:7101/api/Account';

  constructor(private http: HttpClient) { }

  loginUser(user: Login): Observable<ReturnResponse> {
    return this.http.post<ReturnResponse>(this.baseServerUrl + '/Login', user, { headers: this.headers });
  }
}
