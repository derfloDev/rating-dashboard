import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../model/user';
declare let netlifyIdentity: any;
import * as UserActions from '../store/user.actions';
import { UserState } from '../store/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly store: Store<UserState>) {
    netlifyIdentity.init();
    netlifyIdentity.on('init', (user: User) => console.log('init', user));
    netlifyIdentity.on('error', (err: any) => {
      this.store.dispatch(UserActions.error({ error: String(err) }));
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
      this.store.dispatch(UserActions.loggedIn({ user: user }));
    });
    const user = netlifyIdentity.currentUser();
    if (!!user) {
      this.store.dispatch(UserActions.loggedIn({ user: user }));
    }
  }

  public showUserDialog(): void {
    netlifyIdentity.open();
  }
}
