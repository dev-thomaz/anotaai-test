import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { Item } from '../../models/item.model';
import { By } from '@angular/platform-browser';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  const mockItem: Item = { id: 1, title: 'Teste Item', img: 'url', description: 'Desc', type: 1 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the item title', () => {
    const titleElement = fixture.debugElement.query(By.css('.item-card__title'));
    expect(titleElement.nativeElement.textContent).toContain(mockItem.title);
  });

  it('should emit the delete event with the item ID when the delete button is clicked', () => {
    let emittedId: number | undefined;
    component.delete.subscribe(id => emittedId = id);

    const deleteButton = fixture.debugElement.query(By.css('.item-card__delete-button'));
    deleteButton.nativeElement.click();

    expect(emittedId).toBe(mockItem.id);
  });
});