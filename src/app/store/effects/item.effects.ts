import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ItemActions from '../actions/item.actions';
import { ItemService } from '../../services/item.service';

@Injectable()
export class ItemEffects {
  private actions$ = inject(Actions);
  private itemService = inject(ItemService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map(items => ItemActions.loadItemsSuccess({ items })),
          catchError((error) => of(ItemActions.loadItemsFailure({ error: error.message })))
        )
      )
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      mergeMap((action) =>
        of(ItemActions.deleteItemSuccess({ id: action.id })).pipe(
          catchError((error) => of(ItemActions.deleteItemFailure({ error: error.message })))
        )
      )
    )
  );

  constructor() { } 
}