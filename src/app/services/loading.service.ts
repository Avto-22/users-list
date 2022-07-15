import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

constructor() { }
  private _loading:Subject<boolean>=new Subject<boolean>();

  $loading():Observable<boolean>{
    return this._loading.asObservable();
  }

  start(){
    this._loading.next(true);
  }

  end(){
    this._loading.next(false);
  }
}
