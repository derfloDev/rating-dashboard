import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserMetadata } from 'src/app/user/model/userMetadata';
import * as UserActions from 'src/app/user/store/user.actions';
import { selectIsAuthenticated } from 'src/app/user/store/user.selector';

@Component({
  selector: 'app-user-context',
  templateUrl: './user-context.component.html',
  styleUrls: ['./user-context.component.scss'],
})
export class UserContextComponent implements OnInit {
  @Input()
  public userData: UserMetadata | null;

  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  public showUserDialog(): void {
    this.store.dispatch(UserActions.logIn());
  }
}
