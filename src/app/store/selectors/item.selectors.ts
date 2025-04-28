import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../state'; 
import { AppState } from '../state';
import { getItemFeatureKey } from '../reducers/item.reducer'; 

export const selectItemState = createFeatureSelector<AppState, ItemState>(getItemFeatureKey);

export const selectItems = createSelector(selectItemState, (state) => state.items);
export const selectLoading = createSelector(selectItemState, (state) => state.loading);
export const selectError = createSelector(selectItemState, (state) => state.error);