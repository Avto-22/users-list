import { UserApiService } from './user-api.service';
import { UsersListComponent } from './../users-list.component';
import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { catchError, tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListFacadeService {

  page: number=1;

constructor(
  private LoadingService:LoadingService,
  private userApiService:UserApiService
  ) { }

  getUsersList(usersListComponent:UsersListComponent){
    this.LoadingService.start();
    this.userApiService.getUsersByPageName(this.page).pipe(
      catchError(() => of({
        list: [],
        pagination: {
          nextPage: 0
        }
      })),
      tap(x => {
        if (x.list.length > 0 && x.pagination.nextPage > 0) {
          usersListComponent.users = x.list;
          this.page = x.pagination.nextPage;
        } else {
          console.log('request error');
        }
        this.LoadingService.end();
      })
    ).subscribe();
  }

  onWindowScroll(usersListComponent:UsersListComponent) {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      this.LoadingService.start();
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
            usersListComponent.users = [...usersListComponent.users, ...x.list];
            this.page = x.pagination.nextPage;
          } else {
            console.log('request error');
          }
          this.LoadingService.end();
        })
      ).subscribe();
    }
  }
}
