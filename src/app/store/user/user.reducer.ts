import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as UserActions from './user.actions';

export interface UserState {
    user?: User;
    isAuthenticated: boolean;
    
}export const initialUserState: UserState = {
    isAuthenticated: false,
};

export const userFeatureKey = 'user';

export const userReducer = createReducer(
    initialUserState,
    on(UserActions.loggedIn, (state, { user }) => ({ ...state, user: user, isAuthenticated: true })),
    on(UserActions.loggedOut, (state) => ({ ...state, user: null, isAuthenticated: false }))
);
