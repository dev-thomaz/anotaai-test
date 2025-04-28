import { createReducer, on } from '@ngrx/store';
import { initialItemState, ItemState } from '../state';
import * as ItemActions from '../actions/item.actions';

export const itemReducer = createReducer(
  initialItemState,
  on(ItemActions.loadItems, (state) => ({ ...state, loading: true, error: null })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, loading: false, items })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ItemActions.deleteItem, (state, { id }) => ({ ...state, loading: true, error: null })),
  on(ItemActions.deleteItemSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    items: state.items.filter(item => item.id !== id),
  })),
  on(ItemActions.deleteItemFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const getItemFeatureKey = 'items';

export interface State extends ItemState {}

export const reducers = {
  [getItemFeatureKey]: itemReducer,
};