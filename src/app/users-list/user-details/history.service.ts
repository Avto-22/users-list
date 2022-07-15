import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HistoryUser } from '../users-list.model';
import { UserDetailsComponent } from './user-details.component';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  saveUser: HistoryUser[] = [];

  setUsershistory(user: HistoryUser, userDetailsComponent:UserDetailsComponent) {
    this.saveUser = [...this.saveUser, user];
    userDetailsComponent.users=this.saveUser;
  }
}
