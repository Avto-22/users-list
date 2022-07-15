import { HistoryUser } from './../users-list.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsFnService {

  constructor(
    private router:Router,
  ) { }

  goToDetails(id: number, activeIndex?:number) {
    this.router.navigate([`user/${id}`]);
    if(activeIndex>=0){ 
      let arr:HistoryUser[] = JSON.parse(localStorage.getItem('users')).map(x => {
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

}
