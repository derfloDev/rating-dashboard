import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser = createSelector(
  getUserState,
  (state: UserState) => state.user?.user_metadata
);

export const selectToken = createSelector(
  getUserState,
  (state: UserState) => state.user?.token
);

export const selectIsAuthenticated = createSelector(
  getUserState,
  (state: UserState) => state.isAuthenticated
);
