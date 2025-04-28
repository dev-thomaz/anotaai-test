import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemService } from './services/item.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { itemReducer, getItemFeatureKey } from './store/reducers/item.reducer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  const routes: Routes = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        ItemListComponent,
        ItemCardComponent,
        FormsModule,
        AppComponent,
        NoopAnimationsModule,
      ],
      providers: [
        ItemService,
        provideStore({ [getItemFeatureKey]: itemReducer }),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();
  });

  it('should create the app', () => { 
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'anota-ai-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('anota-ai-app');
  });

});