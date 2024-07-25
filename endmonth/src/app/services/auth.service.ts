import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl=' http://localhost:3000/user/login'

  constructor(private http:HttpClient) { }

   
  saveToken(token:string):void{
    localStorage.setItem('authToken',token);
  }

  getToken():string|null{
    return localStorage.getItem('authToken')
  }
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

 
  getUserId(): string {
    const user = this.getUser();
    if (!user || !user.id) {
      throw new Error('User ID not found');
    }
    return user.id;
  }
  
  logout():void{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user')
  }

}
