import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserApiResponse } from '../model/user.model';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface registerPayload {
  name: string;
  email: string;
  password: string;
}
export interface registerResponse {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export interface query {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:3000/';

  register(subUrl: any, data: registerPayload): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.API_URL + subUrl, data);
  }
  login(subUrl: any, data: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL + subUrl, data);
  }

  getdatalist(subUrl: any, query: any): Observable<UserApiResponse> {

    let params = new HttpParams();

    Object.entries(query).forEach(([Key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(Key, String(value));
      }
    });
    return this.http.get<UserApiResponse>(this.API_URL + subUrl, { params })
  }

}
