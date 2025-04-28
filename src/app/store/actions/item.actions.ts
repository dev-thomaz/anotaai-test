import { createAction, props } from '@ngrx/store';
import { Item } from '../../models/item.model';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction('[Item] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item] Load Items Failure', props<{ error: string }>());

export const deleteItem = createAction('[Item] Delete Item', props<{ id: number }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ id: number }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ error: string }>());