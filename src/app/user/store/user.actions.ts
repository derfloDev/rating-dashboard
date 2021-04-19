import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/user/model/user';

export const showUserDialog = createAction('[User] show dialog',);
export const logIn = createAction('[User] log in');
export const error = createAction('[User] error', props<{ error: any }>());
export const loggedIn = createAction('[User] user logged in', props<{ user: User }>());
export const loggedOut = createAction('[User] user logged out');