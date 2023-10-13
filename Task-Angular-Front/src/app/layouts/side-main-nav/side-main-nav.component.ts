import { Component, OnDestroy } from '@angular/core';
import { NavItem } from './ui/model/nav-item';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { menu } from './ui/model/menu';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-side-main-nav',
  templateUrl: './side-main-nav.component.html',
  styleUrls: ['./side-main-nav.component.scss']
})

export class SideMainNavComponent implements OnDestroy {

  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;
  User: any;

  constructor(
    private media: MediaObserver,
    private router: Router,
    private usersService: AuthService
  ) {
    this.User = JSON.parse(localStorage.getItem('currentUser')!).data
    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  signout() {
    this.usersService.logout()
    window.location.reload()
  }
}
