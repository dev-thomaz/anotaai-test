import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemCardComponent } from '../item-card/item-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadItems, deleteItem } from '../../store/actions/item.actions';
import { selectItems, selectLoading, selectError } from '../../store/selectors/item.selectors';
import { AppState } from '../../store/state';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemCardComponent, AsyncPipe, NgFor,NgIf],
  template: `
    <div class="item-list">
      <div *ngIf="loading$ | async">Carregando itens...</div>
      <div *ngIf="error$ | async">Erro ao carregar itens: {{ error$ | async }}</div>
      <app-item-card
        *ngFor="let item of filteredItems$ | async"
        [item]="item"
        (delete)="deleteCard(item.id)"
      ></app-item-card>
    </div>
  `,
  styles: [`
    .item-list {
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
      justify-content: space-around;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit, OnChanges {
  private store = inject(Store<AppState>);
  items$: Observable<Item[]> = this.store.select(selectItems);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  @Input() searchTerm: string = '';
  filteredItems$!: Observable<Item[]>;

  ngOnInit(): void {
    this.store.dispatch(loadItems());
    this.filterItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filterItems();
    }
  }

  deleteCard(id: number): void {
    this.store.dispatch(deleteItem({ id }));
  }

  private filterItems(): void {
    this.filteredItems$ = this.items$.pipe(
      startWith([]),
      map(items =>
        items.filter(item =>
          item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
          item.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
      )
    );
  }
}