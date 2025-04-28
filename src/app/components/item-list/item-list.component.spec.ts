import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../../services/item.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ItemCardComponent } from '../item-card/item-card.component';
import { provideStore } from '@ngrx/store'; 
import { itemReducer, getItemFeatureKey } from '../../store/reducers/item.reducer'; 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ItemService', ['getItems']);

    TestBed.configureTestingModule({
      imports: [
        ItemCardComponent,
        ItemListComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ItemService, useValue: spy },
        provideStore({ [getItemFeatureKey]: itemReducer }), 
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemServiceSpy = TestBed.inject(ItemService) as jasmine.SpyObj<ItemService>;
    httpTestingController = TestBed.inject(HttpTestingController);

    itemServiceSpy.getItems.and.returnValue(of([]));
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});