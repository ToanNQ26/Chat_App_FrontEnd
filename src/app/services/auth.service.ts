// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://localhost:8180'

  constructor(private http: HttpClient) {}

  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, { phone, password });
  }

  register(fullName: string, email: string, password: string, dateOfBirth: string, phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/register`, { fullName, email, password, dateOfBirth, phone });
  }

  registerForgot(email : string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, {email}, {responseType: 'text'});
  }

  getUserOnline(): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}/User/online`).pipe(
      map(res => res.result as User[])
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

  