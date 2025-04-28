import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { itemReducer, getItemFeatureKey } from './store/reducers/item.reducer';
import { ItemEffects } from './store/effects/item.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [getItemFeatureKey]: itemReducer }),
    provideEffects([ItemEffects]), 
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};