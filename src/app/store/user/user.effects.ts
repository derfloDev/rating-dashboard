import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    logIn$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logIn),
        map(() => {
            this.userService.showUserDialog();
        })
    ), { dispatch: false })

    constructor(private actions$: Actions, private userService: UserService) {

    }
}