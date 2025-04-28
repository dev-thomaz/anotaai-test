import { Item } from '../models/item.model';

export interface AppState {
  items: ItemState;
}

export interface ItemState {
  loading: boolean;
  items: Item[];
  error: string | null;
}

export const initialItemState: ItemState = {
  loading: false,
  items: [],
  error: null,
};

export const initialState: AppState = {
  items: initialItemState,
};