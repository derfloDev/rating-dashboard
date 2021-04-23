import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/user/store/user.selector';
import { UserMetadata } from 'src/app/user/model/userMetadata';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public userData$: Observable<UserMetadata> = this.store.select(selectUser);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
  }

}
