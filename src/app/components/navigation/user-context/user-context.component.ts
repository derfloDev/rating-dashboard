import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserMetadata } from 'src/app/models/userMetadata';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from 'src/app/store/user/user.actions';
import { selectIsAuthenticated } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-user-context',
  templateUrl: './user-context.component.html',
  styleUrls: ['./user-context.component.scss']
})
export class UserContextComponent implements OnInit {

  @Input()
  public userData: UserMetadata | null;

  public isAuthenticated: Observable<boolean>;

  constructor(private store: Store) {
    this.isAuthenticated = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
  }

  public showUserDialog(): void {
    this.store.dispatch(UserActions.logIn());
  }
}
