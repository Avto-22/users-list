import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersApiResponse } from '../users-list.model';

export const USER_API_BASE_URL= new InjectionToken<string>('users base'); 

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

constructor(
  @Inject(USER_API_BASE_URL) public baseUrl:string,
  private http:HttpClient
  ) { }

  getUsersByPageName(page:number):Observable<UsersApiResponse>{
    return this.http.get<UsersApiResponse>(`${this.baseUrl}/${page}/20`);
  }

  getFriendsByIdAndByPageName(userId:number,page:number):Observable<UsersApiResponse>{
    return this.http.get<UsersApiResponse>(`${this.baseUrl}/${userId}/friends/${page}/20`)
  }

  getUserById(userId:number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

}
