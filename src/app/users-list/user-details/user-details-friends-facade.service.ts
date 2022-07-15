import { User } from './../users-list.model';
import { UserDetailsComponent } from './user-details.component';
import { catchError, tap, delay, finalize } from 'rxjs/operators';
import { FriendsComponent } from './friends/friends.component';
import { UserApiService } from './../services/user-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HistoryUser } from '../users-list.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsFriendsFacadeService {

  page: number = 1;

  constructor(
    private loadingService: LoadingService,
    private userApiService: UserApiService,
    private router:Router
  ) { }

  getUser(userDetailsComponent: UserDetailsComponent) {
    this.loadingService.start();
    this.userApiService.getUserById(userDetailsComponent.userId).pipe(
      tap(user => {
      userDetailsComponent.user = user;
      this.saveInLocalStorage(user);
    }),
    finalize(()=>{
      this.loadingService.end();
    })
    ).subscribe(()=>{},()=>{
      this.router.navigate(['not-found']);
    });
  }

  getFriendsList(friendsComponent: FriendsComponent) {
    this.loadingService.start();
    this.userApiService.getFriendsByIdAndByPageName(friendsComponent.userId, this.page).pipe(
      catchError(() => of({
        list: [],
        pagination: {
          nextPage: 0
        }
      })),
      tap(friendsResponse => {
        if (friendsResponse.list.length > 0 && friendsResponse.pagination.nextPage > 0) {
          friendsComponent.friends = friendsResponse.list;
          this.page = friendsResponse.pagination.nextPage;
        } else {
          console.log('request error');
        }
        this.loadingService.end();
      })
    ).subscribe();
  }

  onWinsowScroll(friendsComponent: FriendsComponent) {  // infinite scroll logic
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      this.loadingService.start();
      this.userApiService.getUsersByPageName(this.page).pipe(
        catchError(() => of({
          list: [],
          pagination: {
            nextPage: 0
          }
        })),
        delay(500),
        tap(x => {
          if (x.list.length > 0 && x.pagination.nextPage > 0) {
            friendsComponent.friends = [...friendsComponent.friends, ...x.list];
            this.page = x.pagination.nextPage;
          } else {
            console.log('request error');
          }
          this.loadingService.end();
        })
      ).subscribe();
    }
  }

  saveInLocalStorage(user: User) {
    let arr: HistoryUser[];
    if (JSON.parse(localStorage.getItem('users'))) {
      arr = JSON.parse(localStorage.getItem('users')).map(x => {
        return {
          ...x,
          isActive: false
        }
      });

      if (!arr.find(x => x.name == `${user?.prefix} ${user?.name} ${user.lastName}`)) {
        localStorage.setItem('users', JSON.stringify([
          ...arr,
          {
            name: `${user?.prefix} ${user?.name} ${user.lastName}`,
            userId: user.id,
            isActive: true
          }
        ]));
      }else{
        let activeIndex=arr.indexOf(arr.find(x => x.name == `${user?.prefix} ${user?.name} ${user.lastName}`));
        arr = JSON.parse(localStorage.getItem('users')).map(x => {
          return {
            ...x,
            isActive: false
          }
        });
        arr[activeIndex]={
          ...arr[activeIndex],
          isActive:true
        }
        localStorage.setItem('users',JSON.stringify(arr));
      }
    }
    else {
      localStorage.setItem('users', JSON.stringify([
        {
          name: `${user?.prefix} ${user?.name} ${user.lastName}`,
          userId: user.id,
          isActive: true
        }
      ]));
    }
  }
}