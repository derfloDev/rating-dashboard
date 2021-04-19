import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/user/services/user.service";
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    logIn$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logIn),
        map(() => {
            this.userService.showUserDialog();
        })
    ), { dispatch: false })

    error$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.error),
        map((action) => {
            this.notificationService.error(action.error);
        })
    ), { dispatch: false })

    constructor(private actions$: Actions,
        private userService: UserService,
        private notificationService: NotificationService) {

    }
}