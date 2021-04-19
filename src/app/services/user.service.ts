import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user';
declare let netlifyIdentity: any;
import * as UserActions from '../store/user/user.actions';
import { UserState } from '../store/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly store: Store<UserState>) {
    netlifyIdentity.on('init', (user: User) => console.log('init', user));
    netlifyIdentity.on('error', (err: any) => {
      console.error('Error', err);
      this.store.dispatch(UserActions.loggedOut());
    });
    netlifyIdentity.on('open', () => console.log('Widget opened'));
    netlifyIdentity.on('close', () => console.log('Widget closed'));
    netlifyIdentity.on('logout', () => {
      console.log('Logged out');
      this.store.dispatch(UserActions.loggedOut());
    });
    netlifyIdentity.on('login', (user: User) => {
      console.log('login', user);
      netlifyIdentity.close();
      this.store.dispatch(UserActions.loggedIn({ user: user }))
    });
    const user = netlifyIdentity.currentUser();
    if (!!user) {
      this.store.dispatch(UserActions.loggedIn({ user: user }))
    }
  }

  public showUserDialog(): void {
    netlifyIdentity.open();
  }
}
