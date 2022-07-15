import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'users-list';

  $loading:Observable<boolean>;

  constructor(
    public loadingService:LoadingService,
    private router:Router,
    private changeRef: ChangeDetectorRef
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(){
    document.body.style.background='#444';
    this.$loading=this.loadingService.$loading();
  }

  ngAfterContentChecked() { // Error Handling ChangedAfterItHasBeenChecked
    this.changeRef.detectChanges();
  }

  @HostListener('window:beforeunload', [])
  onWindowClose(){  // remove localsorageitem after refresh or close
    localStorage.removeItem('users');
  }
}
